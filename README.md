## Minimal Reproduction For Clerk Support Ticket

I've been running into errors thrown by Clerk when calling auth() within a server action in production. Upon removing sync-organization or Sentry monitoring the server actions began working again.

When reproducing this issue I've realised that the package manager plays a role so **pnpm must be used**.

I currently am only able to replicate the server action issue on apple silicon Macs, but as I'm experiencing the issue on a linux server I know a linux reproduction must be possible.

Upon reproducing the issue I ran into a very similar issue that does reproduce across OSs which I will describe how to replicate first:

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

Upon opening the site the auth() calls which I assume come from the Clerk prebuilt \<SignedIn>/\<SignedOut> components in the root layout will throw the following Error

```
 ⨯ Error: Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)
```

I have been able to reproduce this error from within a docker container running linux, on a windows machine, and on two Macs.

---

The Server Action Issue has been more illusive. I haven't been able to make a consistent minimal replication from within a docker container yet, but I know it's possible! Currently I have only been able to fully reproduce the issue on two apple silicon macs.

To replicate the behavior perform all the steps above, but remove the Prebuilt Clerk components in the root layout

```jsx
// app/layout.tsx
  ...

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
```

Then rebuild the project with
`pnpm build`
and start it again with `pnpm start`

Upon clicking the "trigger server action" button you should see the same `Unable to decrypt request data` error.


Here is the `npx envinfo` for one of the Macs:
```
System:
    OS: macOS 14.6.1
    CPU: (8) arm64 Apple M3
    Memory: 526.03 MB / 24.00 GB
    Shell: 3.7.0 - /usr/local/bin/fish
  Binaries:
    Node: 20.10.0 - ~/.local/state/fnm_multishells/68100_1737398723594/bin/node
    npm: 10.2.3 - ~/.local/state/fnm_multishells/68100_1737398723594/bin/npm
    pnpm: 8.6.12 - ~/.local/state/fnm_multishells/68100_1737398723594/bin/pnpm
  Browsers:
    Chrome: 131.0.6778.266
    Edge: 127.0.2651.98
    Safari: 17.6
  npmPackages:
    @clerk/nextjs: ^6.9.12 => 6.9.12 
    @sentry/nextjs: 8.45.1 => 8.45.1 
    @types/node: ^22.8.6 => 22.8.6 
    @types/react: ^18.3.12 => 18.3.12 
    @types/react-dom: ^18.3.1 => 18.3.1 
    autoprefixer: ^10.4.20 => 10.4.20 
    eslint: ^9.13.0 => 9.13.0 
    eslint-config-next: ^15.0.2 => 15.0.2 
    next: ^15.1.4 => 15.1.4 
    postcss: ^8.4.47 => 8.4.47 
    react: ^18.3.1 => 18.3.1 
    react-dom: ^18.3.1 => 18.3.1 
    tailwindcss: ^3.4.14 => 3.4.14 
    typescript: ^5.6.3 => 5.6.3 
  ```
