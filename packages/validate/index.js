/**
    表单校验
    JiaLing Liao
    2017-12-08
 */
var Validate = {},
	rules = {
	"password": {
		errMsg: "The password must contain a uppercase letter, a lowercase letter, and a special character between 8-15.",
		check: function(value){
			return !(!!value && !/^(?!\s)((?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).\S{7,14})$/.test(value));
		}
	},
	"null": { //空
		errMsg: "This field is required",
		check: function(value){
			// value = value.trim();
			return !(value === '' || value === undefined || value === null);
		}
	},
	"number": { //数字
		errMsg: "This field must be a number",
		check: function(value){
			return !(!!value && !/^[0-9]+$/.test(value));
		}
	},
	"num-letter": { //数字和字母
		errMsg: "This field can only enter numbers and letters",
		check: function(value){
			return !(!!value && !/^[A-Za-z0-9]+$/.test(value));
		}
	},
	"int": { //整数
		errMsg: "This field must be an integer",
		check: function(value){
			return !(!!value && !/^-?\d+$/.test(value));
		}
	},
	"non-neg-int": { //非负整数
		errMsg: "This field must be a non-negative integer",
		check: function(value){
			return !(!!value && !/^\d+$/.test(value));
		}
	},
	"positive-int": { //正整数
		errMsg: "This field must be a positive integer",
		check: function(value){
			return !(!!value && !/^[0-9]*[1-9][0-9]*$/.test(value));
		}
	},
	"float": { //浮点型
		errMsg: "This field must be a floating point number",
		check: function(value){
			return !(!!value && !/^-?(\d*\.)?\d+$/.test(value));
		}
	},
	"non-neg-float": { //非负浮点型
		errMsg: "This field must be a non-negative floating point number",
		check: function(value){
			return !(!!value && (!/^(\d*\.)?\d+$/.test(value)));
		}
	},
	"positive-float": { //正浮点型
		errMsg: "This field must be a positive floating point number",
		check: function(value){
			return !(!!value && (!/^(\d*\.)?\d+$/.test(value) || value == 0));
		}
	},
	"positive-number": { //正数
		errMsg: "This field must be a positive number",
		check: function(value){
			return !(!!value && !/^\d+(\.{0,1}\d+){0,1}$/.test(value));
		}
	},
	"number-limit": { //数值大小和小数位数限制
		// errMsg: "This field must be a positive number",
		check: function(value,obj){
			let temp = value * 1,
				min = obj.getAttribute("min") * 1 || 0,
				max = obj.getAttribute("max") * 1 || 99999999.99,
				float = obj.getAttribute("float") || 2;

			if((min || min == 0) && (max || max == 0) && (temp < min || temp > max)){
				rules["number-limit"].errMsg = "This field must be between " + min + "-" + max;
				return false;
			} else if((min || min == 0) && temp < min){
				rules["number-limit"].errMsg = "This field can not be less than" + min;
				return false;
			} else if((max || max == 0) && temp > max){
				rules["number-limit"].errMsg = "This field can not be greater than" + max;
				return false;
			} else if(value.indexOf(".") >= 0 && (float || float == 0)){
				float = float * 1;
				if(value.split(".")[1].length > float){
					rules["number-limit"].errMsg = "This field can only be " + float + " decimal places";
					return false;
				}
			}
			return true;
		}
	},
	"letter-limit": { //字符串长度限制
		check: function(value,obj){
			let min = obj.getAttribute("min") * 1 || 0,
				max = obj.getAttribute("max") * 1 || 12;
			if(min && max && (value.length < min || value.length > max)){
				rules["letter-limit"].errMsg = "This field must be " + min + "-" + max + " characters";
				return false;
			} else if(min && value.length < min){
				rules["letter-limit"].errMsg = "This field must be at least" + min + " characters";
				return false;
			} else if(max && value.length > max){
				rules["letter-limit"].errMsg = "This field must be at most" + max + " characters";
				return false;
			}
			return true;
		}
	},
	"email": { //邮箱
		errMsg: "Please enter the correct mailbox",
		check: function(value){
			return !(!!value && !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value));
		}
	}
}
//
Validate.validate = function(opt){
	let _this = this,
		$container = _this.$el,
		result = {
			success: true
		};
	opt.forEach(function(item){
		item.el.forEach(function(el){
			$container.querySelectorAll(el).forEach(function(obj){
				//下拉树校验
		    	if(obj.classList.value.indexOf("el-input") >= 0 || obj.querySelectorAll(".el-input").length){
		    		obj = obj.querySelector("input[type=text]");
		    	}
				obj.onchange = function(value){
					if(typeof value == "string" || typeof value == "number"){
						obj.value = value;
					}
					for(let i = 0; i < item.rules.length; i++){
						if(!_this.updateValidateMsg(obj,item.rules[i],item.layout)){
							result.success = false;
							break;
						}
					}
				}
				obj.onchange();
			});
		});
	});
	return result;
};

//更新错误提示信息
Validate.updateValidateMsg = function(obj,rule,layout){
	let $sibling = obj.nextElementSibling,
		parentNode = obj.parentNode,
		result = rules[rule.type].check(obj.value,obj);

	while($sibling && $sibling.classList.value != "" && $sibling.classList.value.indexOf("validate-error") == -1){
		$sibling = $sibling.nextElementSibling;
	}

	if(!$sibling || ($sibling.tagName.toLowerCase() != "span" && $sibling.tagName.toLowerCase() != "i")){
		let newEl = document.createElement(layout == "icon" ? "i" : "span");
		if(!$sibling || parentNode.lastChild == obj){
	        parentNode.appendChild(newEl);
	    } else {
           parentNode.insertBefore(newEl,$sibling);
       	}
		$sibling = newEl;
	}
	$sibling.classList.add("validate-error");
	if(layout == "icon"){
		$sibling.classList.add("fl-icon-info");
	}

	if(result){
		$sibling.innerHTML = "";
		if(layout == "icon"){
			$sibling.classList.remove("fl-icon-info");
    	}
	} else {
		if(layout != "icon"){
			$sibling.innerHTML = rule.errMsg || rule.message || rules[rule.type].errMsg;
    		$sibling.style.left = obj.offsetLeft + "px";
    	}
		$sibling.setAttribute("title",rule.errMsg || rule.message || rules[rule.type].errMsg);
	}
	return result;
};
//清空obj元素下的所有错误信息提示
Validate.$clearErrorMsg = function(obj){
	obj = obj || this.$el;
	if(!obj){
		return;
	}
	let objClass = obj.classList;
	if(objClass.contains("validate-error") || objClass.contains("icon-error")){
		obj.innerHTML = "";
	}
	objClass.remove("validate-error");
	objClass.remove("icon-error");

   	let $errors = obj.querySelectorAll(".validate-error,.icon-error");
   	$errors.forEach(function(item){
   		item.classList.remove("validate-error");
   		item.classList.remove("icon-error");
   		item.innerHTML = "";
   	});

    return obj;
};
export default Validate;