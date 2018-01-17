all: compile clean

compile:
	pdflatex RapportIHME.tex
	bibtex RapportIHME
	#pdflatex RapportIHME.tex
	pdflatex RapportIHME.tex

clean:
	find . -type f -not -name '*.tex' -not -name '*.png' -not -name '*.bib' -not -name '*.jpg' -not -name '*.pdf' -not -name 'Makefile' -delete
	# rm *.aux 
	# rm *.log
	# rm *.out
	# rm *.toc
	# rm *.fdb_latexmk
	# rm *.fls
	# rm *.lof
	# rm *.maf
	# rm *.mtc
	# rm *.mtc0
	# rm includes/*.aux

