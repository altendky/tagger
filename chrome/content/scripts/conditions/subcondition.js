/*******************************************************************************
*** Tagger Songbird addon
********************************************************************************
The contents of this file are subject to the Mozilla Public License
Version 1.1 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License at
<http://www.mozilla.org/MPL/>

Software distributed under the License is distributed on an "AS IS"
basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
License for the specific language governing rights and limitations
under the License.

Alternatively, the contents of this file may be used under the terms
of the GNU General Public license (the  "GPL License"), in which case the
provisions of GPL License are applicable instead of those
above.


For feedback and questions about the Tagger Songbird addon please mail me,
Jonas Wielicki:
<j.wielicki@sotecware.net>
- or -
Leave a comment at:
<http://addons.songbirdnest.com/addons/1554>
*******************************************************************************/
function TaggerAction_Subcondition_Evaluate(state)
{
  var returnValue = state.evaluateConditions(this["conditions"].value, this["conditionlink"].values[this["conditionlink"].value].value, this.properties["optimize"].value);
  if (this["invert"].value)
    returnValue = !returnValue;
  
  if (returnValue)
    state.executeActionList(this["trueactions"].value);
  else
    state.executeActionList(this["falseactions"].value);
  return returnValue;
}

function TaggerAction_Subcondition()
{
  this.properties = new Array(
    new TAProp("conditionlink", i18n("conditionlink"), {"id": TA_PROPTYPE_ENUM, "values": new Array(
      new TAEnumValue("and", i18n("condlink_and")), 
      new TAEnumValue("or", i18n("condlink_or")),
      new TAEnumValue("xor", i18n("condlink_xor"))
    )}, false),
    new TAProp("invert", i18n("invert"), {"id": TA_PROPTYPE_BOOL}, false),
    new TAProp("optimize", i18n("optimize"), {"id": TA_PROPTYPE_BOOL}, false),
    new TAProp("conditions", i18n("conditions"), {"id": TA_PROPTYPE_CONDITIONLIST}, false),
    new TAProp("trueactions", i18n("trueactions"), {"id": TA_PROPTYPE_ACTIONLIST}, false),
    new TAProp("falseactions", i18n("falseactions"), {"id": TA_PROPTYPE_ACTIONLIST}, false)
  );
  this.displayName = i18n("subcondition");
  this.evaluate = TaggerAction_Subcondition_Evaluate;
  this.toString = TaggerCondition_ToString;
  this.cc = TaggerAction_Subcondition;
  this.prepare = TaggerAction_Conditional_Prepare;
}

TCRegister(TaggerAction_Subcondition, "subcondition");