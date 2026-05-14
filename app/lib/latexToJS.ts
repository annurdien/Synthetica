export function latexToJS(latex: string): string {
    if (!latex) return '0';
    
    let js = latex;
    
    // Replace \cdot and \times
    js = js.replace(/\\cdot/g, '*').replace(/\\times/g, '*');

    // Replace modulo operators
    js = js.replace(/\\bmod/g, '%').replace(/\\mod/g, '%');
    
    // Replace constants
    js = js.replace(/\\pi/g, 'PI');
    js = js.replace(/\\infty/g, 'Infinity');

    const powerFuncMap: Record<string, string> = {
        'sin': 'sin', 'cos': 'cos', 'tan': 'tan', 'arcsin': 'asin',
        'arccos': 'acos', 'arctan': 'atan', 'ln': 'log', 'log': 'log10',
        'exp': 'exp', 'sign': 'sign', 'floor': 'floor'
    };

    // Handle functions with powers e.g. \sin^2\left(x\right) or \sin^{2}(x)
    js = js.replace(/\\(sin|cos|tan|arcsin|arccos|arctan|ln|log|exp|sign|floor)\^\{?([0-9.]+)\}?\\left\((.*?)\\right\)/g, (match, func, exp, inner) => {
        const jsFunc = powerFuncMap[func];
        return `(${jsFunc}(${inner}))**${exp}`;
    });

    js = js.replace(/\\(sin|cos|tan|arcsin|arccos|arctan|ln|log|exp|sign|floor)\^\{?([0-9.]+)\}?\((.*?)\)/g, (match, func, exp, inner) => {
        const jsFunc = powerFuncMap[func];
        return `(${jsFunc}(${inner}))**${exp}`;
    });
    
    // Replace mathematical functions without powers
    const funcMap: Record<string, string> = {
        '\\\\sin': 'sin',
        '\\\\cos': 'cos',
        '\\\\tan': 'tan',
        '\\\\arcsin': 'asin',
        '\\\\arccos': 'acos',
        '\\\\arctan': 'atan',
        '\\\\ln': 'log',
        '\\\\log': 'log10',
        '\\\\exp': 'exp',
        '\\\\sign': 'sign',
        '\\\\floor': 'floor',
        '\\\\text\\{random\\}': 'random',
        '\\\\text\\{mod\\}': '%',
        '\\\\text\\{floor\\}': 'floor',
    };
    
    for (const [latexFunc, jsFunc] of Object.entries(funcMap)) {
        js = js.replace(new RegExp(latexFunc, 'g'), jsFunc);
    }
    
    // Handle square roots \sqrt{x}
    js = js.replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)');
    
    // Handle nth roots \sqrt[n]{x}
    js = js.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, 'pow($2, 1/$1)');
    
    // Handle fractions \frac{num}{den} (Note: Does not handle nested fractions automatically unless recursive, but simple ones work)
    while (js.includes('\\frac')) {
        js = js.replace(/\\frac\{((?:[^{}]|{[^{}]*})*)\}\{((?:[^{}]|{[^{}]*})*)\}/g, '(($1)/($2))');
    }
    
    // Handle power x^{y}
    while (js.match(/\^\{((?:[^{}]|{[^{}]*})*)\}/)) {
        js = js.replace(/\^\{((?:[^{}]|{[^{}]*})*)\}/g, '**($1)');
    }
    js = js.replace(/\^([0-9A-Za-z])/g, '**$1');

    // Handle absolute value \left| x \right|
    js = js.replace(/\\left\|(.*?)\\right\|/g, 'abs($1)');
    js = js.replace(/\|(.*?)\|/g, 'abs($1)');

    // Strip unneeded left/right wrappers
    js = js.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
    js = js.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');
    js = js.replace(/\\left\\\{/g, '{').replace(/\\right\\\}/g, '}');

    // Strip curly braces
    js = js.replace(/[\{\}]/g, ''); 

    // Add implicit multiplication (heuristic: number followed by variable -> number * variable)
    js = js.replace(/([0-9])([a-zA-Z])/g, '$1*$2');
    
    // Strip remaining backslashes and spaces
    js = js.replace(/\\/g, ''); 
    js = js.replace(/\s+/g, '');
    
    // Add implicit multiplication around PI (since we removed spaces, PIx becomes PI*x)
    js = js.replace(/PI([a-zA-Z])/g, 'PI*$1');
    js = js.replace(/([a-zA-Z])PI/g, '$1*PI');

    return js;
}
