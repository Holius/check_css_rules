const get_all_nodes_in_element = (dom = document.querySelector('body')) => {
    const nodes = [dom]
    const inner = (current) => {
        children = [...current.children]
        children.forEach( child => {
            if (child.localName !== 'script') { 
            nodes.push(child)
            if (child.children.length) inner(child)
            }
        })
    }
    inner(dom)
    return nodes
}

const try_stylesheet = (stylesheet) => {
    try {
        stylesheet['cssRules'] //failed look ups throw an error
        return true
    } catch {
        return false
    }
}

//document.styleSheets gets all stylesheets in document (including ones without cssRules)
const get_all_style_rules = (stylesheets = document.styleSheets) => {
    const rules = []
    for (let stylesheet of stylesheets) {
        if (try_stylesheet(stylesheet)) { //handles the case of the stylesheet not containing css rules
            for (let rule of stylesheet['cssRules']) {
                rules.push(rule.selectorText)
            }
        }
    }
    return rules
}

const get_all_rules_not_applied = (rules = get_all_style_rules(), dom = get_all_nodes_in_element()) => {
    const matchless = []
    rules.forEach(rule => {
        for (let element of dom) {
            if (element.matches(rule)) return //matches method returns true if CSS selector string would apply to element
        }
        matchless.push(rule)
    })
    return matchless
}

const get_all_rules_applied_to_element = (elm, rules = get_all_style_rules(), ) => {
    const applied = []
    rules.forEach(rule => {
        if (elm.matches(rule)) applied.push(rule)
    })
    return applied
}

//call get_all_rules_not_applied to get all the rules in stylesheets not applied
///note that by default it compares current state of the DOM to ALL rules.  This means that false positives are very likely.
///consider limiting rules applied or element traversed through for a more accurate snapshot
