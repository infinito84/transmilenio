using namespace std;
using namespace rapidjson;

double dices(){
	return (double)rand()/(double)(RAND_MAX);
}

char* readFile(char const * file){
	FILE *fp;
	long lSize;
	char *buffer;
	fp = fopen ( file, "rb" );
	if( !fp ) perror(file),exit(1);

	fseek( fp, 0L, SEEK_END);
	lSize = ftell( fp );
	rewind( fp );

	buffer = (char*)calloc( 1, lSize+1 );
	if( !buffer ) fclose(fp),fputs("memory alloc fails",stderr),exit(1);

	if( 1!=fread( buffer, lSize, 1, fp) ){
		fclose(fp),free(buffer),fputs("entire read fails",stderr),exit(1);
	}

	fclose(fp);
	return buffer;
}

void writeFile(char const * file, string content){
	ofstream myfile;
	myfile.open (file);
	myfile << content;
	myfile.close();
}
