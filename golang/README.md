
# Uncomment/Commnet the main function
In Go, a directory is a package, and a package can only have one function with a given name (with the exception of init(), which is a special case). 
You think of all your .go files in a directory as separate, but Go does not; it sees a single package, and that package declares multiple functions called main, which is not permitted.
Only 1 main is allowes in the one package(folder)
comment and uncommented the rest of when you are done testing

# To add module
go mod init example.com/m/v2