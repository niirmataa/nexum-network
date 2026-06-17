# Nexum Release Manager

Use this skill to prepare release notes, module status reports, CI checks, and publication readiness for Nexum repositories.

## When To Use

Use this skill when the task mentions:

- release,
- publish,
- repo cleanup,
- CI readiness,
- status report,
- changelog,
- version bump,
- public repository preparation.

## Inputs

Expected inputs:

- repository path,
- branch and remote status,
- commit log,
- CI results,
- changed-file list,
- known security risks.

## Workflow

1. Check `git status --short --branch`.
2. Check remote, branch, ahead/behind state, and recent commits.
3. Scan for obvious secrets before publication.
4. Run the repository verification command.
5. Summarize what is stable, experimental, and blocked.
6. Prepare a small release note or status report.
7. Ask for explicit approval before public push if code or strategy will be disclosed.

## Output

Return:

- repository status,
- commits included,
- CI/test result,
- publication risk notes,
- next recommended command or action.

## Safety Notes

- Do not force-push shared history without explicit approval.
- Do not publish private source or strategy without explicit approval.
- Do not hide failing CI.
- Do not rewrite crypto or key-management history without review.
