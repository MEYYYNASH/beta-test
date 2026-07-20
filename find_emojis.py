import os
import re

emoji_pattern = re.compile(r'[\U00010000-\U0010FFFF\u2600-\u26FF\u2700-\u27BF]')

for root, dirs, files in os.walk('.'):
    # exclude .git and node_modules
    if '.git' in dirs:
        dirs.remove('.git')
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
        
    for file in files:
        if file.endswith(('.html', '.js', '.css')) and file != 'find_emojis.py':
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    for i, line in enumerate(f):
                        if emoji_pattern.search(line):
                            print(f"{filepath}:{i+1}: {line.strip()}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")