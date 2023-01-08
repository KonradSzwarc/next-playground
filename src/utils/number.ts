import { __, divide, flow, round } from 'lodash/fp';
import ms from 'ms';

export const toSeconds = flow(ms, divide(__, 1000), round);
