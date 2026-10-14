import { env } from '@shared/config/env';
import { site } from '@shared/config/site';
import { z } from 'zod';

import type { ContributionDay, ContributionLevel } from '../domain/calendar';

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`;

/** GitHub's own names for the quartiles, in the order of ContributionLevel. */
const LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
] as const;

/**
 * A GraphQL error comes back as a 200, with the reason in `errors` and a
 * `data` the schema below would reject without saying why. Checked first so
 * the build log carries GitHub's own message.
 */
const errorsSchema = z.object({ errors: z.array(z.object({ message: z.string() })).min(1) });

/** Only the fields the query asks for. */
const responseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  date: z.iso.date(),
                  contributionCount: z.number().int(),
                  contributionLevel: z.enum(LEVELS),
                }),
              ),
            }),
          ),
        }),
      }),
    }),
  }),
});

/**
 * The last year of contributions, one entry per day, oldest first. Read once per
 * build: the page is static, so the graph is as fresh as the last deploy, and
 * the daily rebuild workflow is what keeps it moving. Null only in dev without a
 * token.
 */
export async function getContributions(): Promise<ContributionDay[] | null> {
  if (!env.GITHUB_TOKEN) return null;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login: site.githubLogin } }),
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL API answered ${response.status} ${response.statusText}`);
  }

  const body: unknown = await response.json();
  const failure = errorsSchema.safeParse(body);
  if (failure.success) {
    const reasons = failure.data.errors.map((error) => error.message).join('; ');
    throw new Error(`GitHub GraphQL API refused the query: ${reasons}`);
  }

  const { contributionCalendar } = responseSchema.parse(body).data.user.contributionsCollection;

  return contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS.indexOf(day.contributionLevel) as ContributionLevel,
    })),
  );
}
