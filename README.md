# check_css_rules
Functions to debug CSS3 by matching rules in document to elements in document

**Call get_all_rules_not_applied to get all the rules in stylesheets not applied
   
   note that by default it compares current state of the DOM to ALL rules.  This means that false positives are very likely.
   consider limiting rules applied or element traversed through for a more accurate snapshot
  
**Mutation Obversever needed for dynamic updates
  
  functions will not call automatically when DOM changes
  use this article as reference to create dynamic debugging https://medium.com/allenhwkim/dom-changed-event-using-mutationobserver-a2b2834dded6
  
**Beware of False Positives
  
  if the rules appears in the not_applied array make sure the DOM element that the rule should apply to actually exists at the time the function was called
