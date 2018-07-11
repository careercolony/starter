// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  domain: 'http://localhost:4200',
  storage: {
    name: 'starter',
    place: 'session'
  },
  cipher: {
    secretKey: 'starter'
  },
  email: {
    url: 'https://cors-anywhere.herokuapp.com/https://api.mailgun.net/v3/sub.alarinna.com/messages',
    authorization: 'Basic YXBpOmtleS04NDM5YjZmYWRhN2Y3ZGRlMDY1MmQ1NTY0Y2ZmMGZkZQ==',
    from: 'Admin<admin@carriercolony.com>',
  },
  emailVerify: {
    expiry: '1d'
  }
};
