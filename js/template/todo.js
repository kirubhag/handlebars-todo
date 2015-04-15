(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['todo'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <article class=\"blog\" data-taskid=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"blog-ctrls fl\">\n            <i class=\"fa fa-square-o\"></i>\n        </div>\n        <div class=\"blog-title w30 fl\">\n            <strong class=\""
    + alias3(((helper = (helper = helpers.isFinished || (depth0 != null ? depth0.isFinished : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"isFinished","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</strong>\n        </div>\n        <div class=\"blog-content-wrap\">\n            <div class=\"cont\">\n                <p class=\""
    + alias3(((helper = (helper = helpers.isFinished || (depth0 != null ? depth0.isFinished : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"isFinished","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n        </div>\n    </article>\n    <div class=\"clrfix\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.iterate || (depth0 && depth0.iterate) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.blogs : depth0),{"name":"iterate","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();