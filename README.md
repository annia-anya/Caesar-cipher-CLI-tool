# Caesar-cipher-CLI-tool

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (required)
2.  **-i, --input**: an input file (optional)
3.  **-o, --output**: an output file (optional)
4.  **-a, --action**: an action encode/decode (required [encode | decode])

## Examples of usage
```
node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"

node my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt

node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt

node my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```