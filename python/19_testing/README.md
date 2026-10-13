# Testing

```bash
cd 19_testing
python3 -m unittest -v test_calculator_unittest   # built-in, no installs
python3 doctest_example.py             # doctests
pip install pytest                     # (inside a virtual environment, see chapter 20)
python3 -m pytest -v                   # runs pytest AND unittest tests
python3 -m pytest --doctest-modules    # include doctests
```

| File | What it shows |
|---|---|
| `calculator.py` | the code being tested |
| `test_calculator_unittest.py` | `unittest`, `setUp`, `assertRaises`, `unittest.mock.patch` |
| `test_calculator_pytest.py` | pytest: `assert`, `parametrize`, fixtures, `pytest.raises`, `monkeypatch` |
| `doctest_example.py` | tests written as docstring examples |

Next steps: `pytest-cov` for coverage, `hypothesis` for property-based testing, `tox`/`nox` to test across Python versions.
