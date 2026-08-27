// Rendering 100 products plus the full facet tree server-side produced ~1.8 MB of HTML per
// category. 36 keeps the grid full on desktop while cutting the document size substantially.
const DEFAULT_ITEMS_PER_PAGE = 36;

const DEFAULT_FEEDBACK_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FEEDBACK_PAGE = 1;
const DEFAULT_QUICK_CHECKOUT_TIMER = 10;

const PER_PAGE_STEPS: number[] = [24, 36, 48];

const ESSENTIAL_COOKIES_INDEX = 0;
const REPLY_CHARACTER_LIMIT = 500;
const PREVIEW_COOKIE: string = 'pwa';
const DEFAULT_REVIEW_MODAL_TYPES = {
  createReview: 'create-review',
  updateReview: 'update-review',
  updateReply: 'update-reply',
  deleteReview: 'delete-review',
  deleteReply: 'delete-reply',
};
const IMAGE_LINK_SUFIX = '/full/';

export const defaults = {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE,
  PER_PAGE_STEPS,
  DEFAULT_FEEDBACK_PAGE,
  DEFAULT_FEEDBACK_ITEMS_PER_PAGE,
  DEFAULT_QUICK_CHECKOUT_TIMER,
  ESSENTIAL_COOKIES_INDEX,
  PREVIEW_COOKIE,
  REPLY_CHARACTER_LIMIT,
  DEFAULT_REVIEW_MODAL_TYPES,
  IMAGE_LINK_SUFIX,
};