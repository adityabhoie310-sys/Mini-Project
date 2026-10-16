from pathlib import Path
import pandas as pd

data_dir = Path("database/raw")

for file in data_dir.glob("*.csv"):
    print(f"\n{'=' * 50}")
    print(f"FILE: {file.name}")

    try:
        df = pd.read_csv(file)

        print("Rows:", len(df))
        print("Columns:", list(df.columns))
        print("\nFirst 5 rows:")
        print(df.head().to_string())
        print("\nMissing values:")
        print(df.isnull().sum().to_string())

    except Exception as error:
        print("Could not read file:", error)