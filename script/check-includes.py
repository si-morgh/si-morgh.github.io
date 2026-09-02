"""Validate {% include %} tags the way Jekyll 4.3 does.

Mirrors Jekyll::Tags::IncludeTag: VARIABLE_SYNTAX (a filename containing {{ }})
is split off first, then the remaining params must satisfy VALID_SYNTAX. This
is stricter than liquidjs -- an unquoted parameter value must match [\\w.-]+,
so an expression such as images[0] is rejected at parse time.
"""
import re, sys, glob

VALID_SYNTAX = r'''([\w-]+)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([\w\.-]+))'''
FULL = re.compile(r'\A\s*(?:' + VALID_SYNTAX + r'(?=\s|\Z)\s*)*\Z')
VARIABLE_SYNTAX = re.compile(
    r'(?P<variable>[^{]*(\{\{\s*[\w\-\.]+\s*(\|.*)?\}\}[^\s{}]*)+)(?P<params>.*)',
    re.M | re.S)
TAG = re.compile(r'\{%-?\s*include(?:_relative)?\s+((?:.|\n)*?)-?%\}')

bad = 0
seen = 0
files = sorted(set(glob.glob('_layouts/*.html') + glob.glob('_includes/**/*.html', recursive=True)
                   + glob.glob('*.html') + glob.glob('*/*.md') + glob.glob('*.md')))
for f in files:
    src = open(f, encoding='utf-8').read()
    for m in TAG.finditer(src):
        markup = m.group(1)
        line = src[:m.start()].count('\n') + 1
        vm = VARIABLE_SYNTAX.match(markup)
        if vm:
            name, params = vm.group('variable').strip(), vm.group('params').strip()
        else:
            parts = re.split(r'\s+', markup.strip(), maxsplit=1)
            name, params = parts[0], (parts[1] if len(parts) > 1 else '')
        seen += 1
        if params and not FULL.match(params):
            bad += 1
            print(f"  INVALID  {f}:{line}  include {name}\n           params: {params[:140]}")
print(f"\n{bad} invalid of {seen} include tag(s)" if bad else f"\nAll {seen} include tags satisfy Jekyll's syntax rules.")
sys.exit(1 if bad else 0)
