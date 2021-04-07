'use strict';

const fs = require('fs');
const regenerate = require('regenerate');

// https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name

// PCENChar ::=
//   "-" | "." | [0-9] | "_" | [a-z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
const set = regenerate('-', '.', '_', 0x00B7)
	.addRange('0', '9')
	.addRange('a', 'z')
	.addRange(0x00C0, 0x00D6)
	.addRange(0x00D8, 0x00F6)
	.addRange(0x00F8, 0x037D)
	.addRange(0x037F, 0x1FFF)
	.addRange(0x200C, 0x200D)
	.addRange(0x203F, 0x2040)
	.addRange(0x2070, 0x218F)
	.addRange(0x2C00, 0x2FEF)
	.addRange(0x3001, 0xD7FF)
	.addRange(0xF900, 0xFDCF)
	.addRange(0xFDF0, 0xFFFD)
	.addRange(0x010000, 0x0EFFFF);
const PCENChar = set.toString();
const PCENCharNoHyphen = set.clone().remove('-').toString();

// PotentialCustomElementName ::=
//   [a-z] (PCENChar)* '-' (PCENChar)*
// Note: The hyphen is omitted from the first group to avoid excess backtracking.
const PotentialCustomElementName = `[a-z](?:${ PCENCharNoHyphen })*-(?:${ PCENChar })*`;
const source = `// Generated using \`npm run build\`. Do not edit.

var regex = /^${ PotentialCustomElementName }$/;

var isPotentialCustomElementName = function(string) {
	return regex.test(string);
};

module.exports = isPotentialCustomElementName;
`;
fs.writeFileSync('index.js', source);
