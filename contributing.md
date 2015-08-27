## Before opening issues

**If you are asking a question**:

Remember that `menubar` is just a lightweight wrapper around Electron. Most of the time you can probably find the answer to your question already answered in the [Electron Issue Tracker](https://github.com/atom/electron/issues)

**For bug reports/technical issues**:

Please provide the following information when opening issues:

- Which version of menubar are you using?
- What cli arguments are you passing?
- What platform are you running menubar on?
- Is there a stack trace in the error message you're seeing?
- If possible, please provide instructions to reproduce your problem

Thanks!

## Releases

- commit your changes
- `npm version <major|minor|patch>`
- `git push && git push --tags` (or `git push` with `git config --global push.followTags true` on latest git)
- `npm publish`
