all: compile clean

compile:
	pdflatex Installation.tex
	#bibtex rapport
	#pdflatex RapportIHME.tex
	pdflatex Installation.tex

clean:
	find . -type f -not -name '*.tex' -not -name '*.png' -not -name '*.pdf' -not -name 'Makefile' -delete
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
