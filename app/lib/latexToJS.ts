export function latexToJS(latex: string): string {
    if (!latex) return '0';
    
    let js = latex;
    
    // Replace \cdot and \times
    js = js.replace(/\\cdot/g, '*').replace(/\\times/g, '*');
    
    // Replace constants
    js = js.replace(/\\pi/g, 'PI');
    js = js.replace(/\\infty/g, 'Infinity');
    
    // Replace mathematical functions
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

    // Ensure missing multiplication is filled (heuristic: number followed by variable -> number * variable)
    // Avoid overriding Math.sin, etc.
    // Replace numbers concatenated with variables like 2t -> 2*t
    js = js.replace(/([0-9])([a-zA-Z])/g, '$1*$2');
    
    // Replace some spaces
    js = js.replace(/\\\s|,/g, ' ');

    js = js.replace(/\\/g, ''); // strip remaining backslashes
    js = js.replace(/[\{\}]/g, ''); // strip curly braces

    return js;
}
