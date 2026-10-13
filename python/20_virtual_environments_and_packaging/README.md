# Virtual environments and packaging

## Why a virtual environment?
Each project gets its **own** folder of installed packages, so projects don't clash
and you never install into the system Python.

```bash
python3 -m venv .venv                # create (once per project)
source .venv/bin/activate            # activate (Windows: .venv\Scripts\activate)
python -m pip install requests       # install into the venv only
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt   # recreate elsewhere
deactivate
```
`.venv/` belongs in `.gitignore`; `requirements.txt` (or `pyproject.toml`) belongs in git.

## uv – the modern, fast tool
[uv](https://docs.astral.sh/uv/) replaces pip, venv, pip-tools and pyenv, and is 10–100× faster.

```bash
uv init myapp && cd myapp       # new project with pyproject.toml
uv add httpx                    # add a dependency (creates .venv and uv.lock)
uv run python main.py           # run inside the project environment
uv python install 3.14          # install a Python version
uvx ruff check .                # run a tool without installing it
```

## Packaging your own code: `pyproject.toml`
`greetings_project/` is a complete, installable package using the standard **src layout**:

```
greetings_project/
├── pyproject.toml          <- name, version, dependencies, entry points
├── src/greetings/
│   ├── __init__.py
│   ├── core.py
│   └── cli.py              <- installed as a "greet" command
└── tests/test_core.py
```

```bash
cd greetings_project
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"      # editable install + dev extras (pytest)
greet Asha --shout           # the command from [project.scripts]
pytest
python -m pip install build && python -m build   # creates dist/*.whl to publish on PyPI
```

## Other tools you'll meet
| Tool | Purpose |
|---|---|
| `ruff` | very fast linter and formatter (replaces flake8, isort, black) |
| `mypy` / `pyright` | type checkers (chapter 15) |
| `pre-commit` | run checks before every commit |
| `poetry`, `hatch`, `pdm` | alternative project managers |
