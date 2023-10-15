/**
 * DON'T USE IN CLIENT SIDE
 * Only use in server side
 */

const IPUT_STUDENT_DOMAIN = "tks.iput.ac.jp";

/** allowed domains */
const ALLOWED_DOMAINS = [IPUT_STUDENT_DOMAIN, "iput.ac.jp"] as readonly string[];

/** length of urlId */
const URLID_LENGTH = 8;

/** characters of urlId */
const URLID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export { ALLOWED_DOMAINS, IPUT_STUDENT_DOMAIN, URLID_CHARS, URLID_LENGTH };
