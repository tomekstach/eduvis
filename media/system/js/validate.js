/**
 * @copyright	Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */
var JFormValidator=function(){"use strict";var handlers,inputEmail,custom,setHandler=function(name,fn,en){en=""===en||en,handlers[name]={enabled:en,exec:fn}},findLabel=function(id,form){var $label,$form=jQuery(form);return!!id&&(($label=$form.find("#"+id+"-lbl")).length?$label:!!($label=$form.find('label[for="'+id+'"]')).length&&$label)},handleResponse=function(state,$el){var $label=$el.data("label");void 0===$label&&($label=findLabel($el.attr("id"),$el.get(0).form),$el.data("label",$label)),!1===state?($el.addClass("invalid").attr("aria-invalid","true"),$label&&$label.addClass("invalid")):($el.removeClass("invalid").attr("aria-invalid","false"),$label&&$label.removeClass("invalid"))},validate=function(el){var $el=jQuery(el),tagName,handler;if($el.attr("disabled"))return handleResponse(!0,$el),!0;if($el.attr("required")||$el.hasClass("required"))if("fieldset"===(tagName=$el.prop("tagName").toLowerCase())&&($el.hasClass("radio")||$el.hasClass("checkboxes"))){if(!$el.find("input:checked").length)return handleResponse(!1,$el),!1}else if(!$el.val()||$el.hasClass("placeholder")||"checkbox"===$el.attr("type")&&!$el.is(":checked"))return handleResponse(!1,$el),!1;if(handler=$el.attr("class")&&$el.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)?$el.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"",$el.attr("pattern")&&""!=$el.attr("pattern")){if($el.val().length){var isValid=new RegExp("^"+$el.attr("pattern")+"$").test($el.val());return handleResponse(isValid,$el),isValid}return $el.attr("required")||$el.hasClass("required")?(handleResponse(!1,$el),!1):(handleResponse(!0,$el),!0)}return""===handler?(handleResponse(!0,$el),!0):handler&&"none"!==handler&&handlers[handler]&&$el.val()&&!0!==handlers[handler].exec($el.val(),$el)?(handleResponse(!1,$el),!1):(handleResponse(!0,$el),!0)},isValid=function(form){var fields,valid=!0,message,error,label,invalid=[],i,l;for(i=0,l=(fields=jQuery(form).find("input, textarea, select, fieldset")).length;i<l;i++)jQuery(fields[i]).hasClass("novalidate")||!1===validate(fields[i])&&(valid=!1,invalid.push(fields[i]));if(jQuery.each(custom,(function(key,validator){!0!==validator.exec()&&(valid=!1)})),!valid&&invalid.length>0){for(message=Joomla.JText._("JLIB_FORM_FIELD_INVALID"),error={error:[]},i=invalid.length-1;i>=0;i--)(label=jQuery(invalid[i]).data("label"))&&error.error.push(message+label.text().replace("*",""));Joomla.renderMessages(error)}return valid},attachToForm=function(form){for(var inputFields=[],elements,$form=jQuery(form),i=0,l=(elements=$form.find("input, textarea, select, fieldset, button")).length;i<l;i++){var $el=jQuery(elements[i]),tagName=$el.prop("tagName").toLowerCase();"input"!==tagName&&"button"!==tagName||"submit"!==$el.attr("type")&&"image"!==$el.attr("type")?"button"===tagName||"input"===tagName&&"button"===$el.attr("type")||($el.hasClass("required")&&$el.attr("aria-required","true").attr("required","required"),"fieldset"!==tagName&&($el.on("blur",(function(){return validate(this)})),$el.hasClass("validate-email")&&inputEmail&&elements[i].setAttribute("type","email")),inputFields.push($el)):$el.hasClass("validate")&&$el.on("click",(function(){return isValid(form)}))}$form.data("inputfields",inputFields)},initialize;return function(){var input;handlers={},custom=custom||{},(input=document.createElement("input")).setAttribute("type","email"),inputEmail="text"!==input.type,setHandler("username",(function(value,element){var regex;return!new RegExp("[<|>|\"|'|%|;|(|)|&]","i").test(value)})),setHandler("password",(function(value,element){var regex;return/^\S[\S ]{2,98}\S$/.test(value)})),setHandler("numeric",(function(value,element){var regex;return/^(\d|-)?(\d|,)*\.?\d*$/.test(value)})),setHandler("zip",(function(value,element){var regex;return/^\d{2}\-\d{3}$/.test(value)})),setHandler("email",(function(value,element){var regex;return value=punycode.toASCII(value),/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)}));for(var forms=jQuery("form.form-validate"),i=0,l=forms.length;i<l;i++)attachToForm(forms[i])}(),{isValid:isValid,validate:validate,setHandler:setHandler,attachToForm:attachToForm,custom:custom}};document.formvalidator=null,jQuery((function(){console.log("zip_field"),jQuery("input[id$='zip_field']").length&&jQuery("input[id$='zip_field']").addClass("validate-zip"),document.formvalidator=new JFormValidator}));