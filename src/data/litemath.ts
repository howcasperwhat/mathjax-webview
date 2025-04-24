const litemath = {
  information_for_contributors: [
    'This file are modified from https://github.com/microsoft/vscode/blob/main/extensions/markdown-math/syntaxes/md-math.tmLanguage.json',
    'This file includes some grammar rules copied from https://github.com/James-Yu/LaTeX-Workshop/blob/master/syntax/TeX.tmLanguage.json',
  ],
  name: 'litemath',
  scopeName: 'text.html.markdown.litemath',
  patterns: [{ include: '#litemath' }],
  repository: {
    litemath: {
      patterns: [
        {
          name: 'comment.line.litemath.tex',
          match: '((?<!\\\\)%)(.+)$',
          captures: {
            1: {
              name: 'punctuation.definition.comment.litemath.tex',
            },
          },
        },
        {
          name: 'meta.function.litemath.tex',
          begin: '((\\\\)([a-zA-Z_]+))\\s*(\\{)',
          beginCaptures: {
            1: {
              name: 'storage.type.function.litemath.tex',
            },
            2: {
              name: 'punctuation.definition.function.litemath.tex',
            },
            3: {
              name: 'entity.name.function.litemath.tex',
            },
            4: {
              name: 'punctuation.definition.arguments.begin.litemath.tex',
            },
          },
          end: '\\}',
          endCaptures: {
            0: {
              name: 'punctuation.definition.arguments.end.litemath.tex',
            },
          },
          patterns: [
            {
              include: '$self',
            },
          ],
        },
        {
          name: 'entity.name.function.litemath.tex',
          match: '(\\\\)([a-zA-Z_]+)\\b',
          captures: {
            1: {
              name: 'punctuation.definition.function.litemath.tex',
            },
          },
        },
        {
          name: 'constant.other.general.litemath.tex',
          match: '(\\\\)(?!begin\\*\\{|verb)([A-Za-z]+)',
          captures: {
            1: {
              name: 'punctuation.definition.constant.litemath.tex',
            },
          },
        },
        {
          match: '\\\\\\{',
          name: 'variable.other.litemath',
        },
        {
          match: '\\\\\\}',
          name: 'variable.other.litemath',
        },
        {
          match: '(([0-9]*[\\.][0-9]+)|[0-9]+)',
          name: 'constant.numeric.litemath.tex',
        },
        {
          match: '[\\\\\\\\\\=\\&\\+\\*/_\\^-]',
          name: 'keyword.operator.litemath',
        },
        {
          match: '[a-zA-Z]+',
          name: 'variable.other.litemath',
        },
      ],
    },
  },
}

export default litemath
