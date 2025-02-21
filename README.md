## Minimal Reproduction For Clerk Support Ticket

I've been running into errors thrown by Clerk when calling auth() with OrganizationSync turned on in middleware. It seems like sentry plays a role aswell

When reproducing this issue I've realised that the package manager plays a role so **pnpm must be used**.

To reproduce use the following node version and pnpm:

```
node: v20.10.0
pnpm: 8.6.12
```

To set up Clerk and Sentry add the following variables to a .env.local in the root of the project

```
# Clerk vars
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY

# Sentry vars
SENTRY_AUTH_TOKEN
SENTRY_DSN
SENTRY_ORG
SENTRY_PROJECT
```

Then run build commands

- `pnpm install`
- `pnpm build`
- `pnpm start`

Upon opening the site the auth() function call in the root layout (from prebuilt clerk components <SignedIn/> and <SignedOut/>) will throw the following Error

```
 ⨯ Error: Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)
```