git log --format='%aN' | sort -u | grep -v ".json" | while read name; do printf "$name \t"; git log --author="$name" --pretty=tformat: --numstat | awk '{lines += $1 - $2 } END { printf "lines: %s\n", lines}'; done

