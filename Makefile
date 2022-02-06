git_stage:
	git add .

github_push:
	git push -u origin main

git_commit: git_stage
	@echo action $(filter-out $@,$(COMMIT_TEXT))
	git commit -m "$(COMMIT_TEXT)"
	make github_push
