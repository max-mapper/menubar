## Before opening issues

**If you are asking a question**:

Remember that `menubar` is just a lightweight wrapper around Electron. Most of the time you can probably find the answer to your question already answered in the [Electron Issue Tracker](https://github.com/electron/electron/issues)

**For bug reports/technical issues**:

Please provide the following information when opening issues:

- Which version of menubar are you using?
- What cli arguments are you passing?
- What platform are you running menubar on?
- Is there a stack trace in the error message you're seeing?
- If possible, please provide instructions to reproduce your problem.

Thanks!

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please):

- merge commits to `master` using [Conventional Commits](https://www.conventionalcommits.org/) messages
- release-please opens/updates a release PR that bumps the version and updates `CHANGELOG.md`
- merging that PR creates the git tag and GitHub release
- `npm publish` the tagged version
