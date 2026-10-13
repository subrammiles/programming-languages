"""
Reading config files
 tomllib (3.11)  - TOML, used by pyproject.toml (read-only)
 configparser    - INI files
 json            - chapter 09
"""
import configparser
import tomllib

toml_text = """
[project]
name = "shop"
version = "1.2.0"
dependencies = ["httpx>=0.27", "rich"]

[database]
host = "localhost"
port = 5432
"""
config = tomllib.loads(toml_text)
print(config["project"]["name"], config["database"]["port"] + 1)  # shop 5433
print(config["project"]["dependencies"])  # ['httpx>=0.27', 'rich']

ini = configparser.ConfigParser()
ini.read_string("""
[server]
host = 0.0.0.0
port = 8000
debug = yes
""")
print(ini["server"]["host"], ini.getint("server", "port"), ini.getboolean("server", "debug"))  # 0.0.0.0 8000 True
