import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  "project_id": "astro-blog-73031",
  "private_key_id": "9fc71501fc294fd0d98c6496fa991ab63ad2a506",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxTe2ipPnZ6Rb5\nGpmWmFFucEIOpJHQW3fI1FeVcYCDgj79oj2AnRsotWMwTj6q4QsgJp1xLMF9pOAx\n7UiCcEpgXSqV6xdfqV2LXkuUKgHAqLADTEIT/bFubS32fuZ9TQ46BawzqUnyHhdr\nKaynQCXwtpU+5ES/ok+cGyEJuVax3JxSL0NVtbA8Gc7v8UszAJE6s2bG5qsfxm8m\n79J+hUK2i8ATLnXUU0BfM91pt4V8wGXkSZuYjyJ6TQzDXjuPMx7rPNxsSK70AkF1\nwMFFGjdZF8IwQkpW6bYkULQW2iYS/ye8xnlWGkXKeLadO52tZh7nKXvZV0PUqmob\nqNqyAqLtAgMBAAECggEAAubME0PQ5OyIGDaDue+vMXf71MKDsl201aAH+OWdHUnV\n3w+3IvIvPhjN0T4Oj3xUUsfe/rmlRvmaQ6bm71+IEBCmQELTJJkgc0XtRbT0R2Nb\nUgp+8FXQAAcgX+7OtdE7gN6T5VqJX8F3T6Ukcq49kLVkNt3EdEBjPiJBhae3T/zN\nuXqvx1baIIuen8+oas0zjtRBi0sGGYu3ocMwyUIrUsKHP4QQ18aye8DNTxyy9IAY\nxO5UoJZAmesIQP+KSqvBC6tO9kT31S488hZDTGJjutr6gimxni2OnnRI8B7mzS3t\nk/+WGDYQYIRayxjrMF6nsI2/Cx4rpLZapIvIgfUfvwKBgQDw6M9MoFQCaX0uHH4p\nYeYuqDSBhGeRgDE+EEFmXf+vdHG9ND4mVB1TwPgld1klpDq+YkGYwpDTVk7v4RbI\nTGT54gPovtWnhvPwOWrRYuiloOe/daRH7zTDtmGy0OTgvZ24DeTOexwQJNsfRJtB\nLBYxj+Gnu6GCDEJ3mSOSeVzAiwKBgQC8aShJSmpHr5WL1l225Cuaxw2LvM+vYzyX\n+IdiWkvpNIgMK12MDDILEELdUq4VFjZX5YsKX95HdjDp6lMTu5Llj8MBYkb3KMW5\nWSr/10nE+vjnmnbqcmgENZ/nRzCa4t8qt8sWrKX9p1m6U5AuXkLncW7U++I2DhsA\nvGv3uUXhZwKBgQChsmGRePtqMwvGa3FyrTcmkdfMJuatDnH+ykJbRzRau7mr2Oju\nKP8WPCtSWm0Hitey+Zg1xEIY15FcCKSWBFCyODWPfqdBLp+E2cUMjWrB4OIr6/Y8\nIh40TrH8p6E4B41ZAFpXDOKlI1fAAPiEIeczlPNM9e9NrpTeWXc61SKgSQKBgBSh\nTw/3XfvLdgyBxHEqOrwP36PVYMhLjW72f5x9VqKKZfsvJGcZTsF3XlrtmrIkZH7r\nW3YfWS9p+aEjT0Vx3HvWafvUzwBxLnVFFjg9Uo6HDIoPl8XEES+kz4V7fg73mIgM\n5+frr6E+mcyVKcxp9dlxyjj3+6T/lmVWPFw7pTMxAoGAXhimu9Mjb4GiUEzKiVBZ\nZEeU0cDEr48pToIaEcPutLAQakK9wH/EaSZx12YEp9f9F6ksHuDN+wN4lpYwPMKT\nF4ZIjJcrlQ3heYMFKH3UUz5SbUCVTRgHiovRWyJ5Z1J+xsi249csMo6TEMZy6Xn0\nrWuurxESCBznOD9nQoakUZw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-eggba@astro-blog-73031.iam.gserviceaccount.com",
  "client_id": "100287371591754746106",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eggba%40astro-blog-73031.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const initApp = () => {
  if (import.meta.env.PROD) {
    console.info('PROD env detected. Using default service account.')
    // Use default config in firebase functions. Should be already injected in the server by Firebase.
    return initializeApp()
  }
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];