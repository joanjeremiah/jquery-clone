const $ = (...args) => {
    //to check if a selector or an element is passed to ${} eg: $(this) 
    if(typeof args[0] === 'string' || typeof args[0] === 'object'){
        const elements = typeof args[0] == 'string' ?  document.querySelectorAll(args[0]) : [args[0]];
        

        elements.hide = () => {
            elements.forEach(el => {
                el.style.display = 'none';
            })
        }
        elements.css = (...args) => {
            if(typeof args[0] == 'string'){
                //getting css property
                if(args[1] == null){
                    return elements[0].style[args[0]];
                }
                //setting css property
                elements.forEach(el => {
                    el.style[args[0]] = args[1];
                })
            }
            //setting multiple css properties
            else if(typeof args[0] == 'object'){
                var keys = Object.keys(args[0]);
                elements.forEach(el => {
                    keys.forEach(cssProperty => {
                        el.style[cssProperty] = args[0][cssProperty];
                    })
                })
            }
        }

        elements.data = (...args) => {
            if(typeof args[0] == 'string'){
                //getting data property
                if(args[1] == null){
                    return elements[0].dataset[args[0].toLowerCase()];
                }
                //setting data property
                elements.forEach(el => {
                    el.setAttribute(`data-${args[0]}`, args[1])
                })
            }
            //setting multiple css properties
            else if(typeof args[0] == 'object'){
                var keys = Object.keys(args[0]);
                elements.forEach(el => {
                    keys.forEach(dataProperty => {
                        el.dataset[dataProperty] = args[0][dataProperty];
                    })
                })
            }
        }

        elements.attr = (...args) => {
            if(typeof args[0] == 'string'){
                elements.forEach(el => {
                    el.setAttribute(args[0],args[1]);
                })
            }
            else if(typeof args[0] == 'object'){
                var keys = Object.keys(args[0]);
                elements.forEach(el => {
                    keys.forEach(attribute => {
                        el.setAttribute(attribute,args[0][attribute]);
                    })
                })
            }
        }
        elements.addClass = (className) => {
            elements.forEach(el => {
                el.classList.add(className);
            })
        }

        elements.toggle = (className) => {
            elements.forEach(el => {
                el.classList.toggle(className);
            })
        }

        elements.append = (content) => {
            if(typeof(content) == 'string'){
                elements.forEach(el => {
                    el.innerHTML += content;
                })
            }

            else if(typeof(content) == 'object'){
                elements.forEach(el => {
                    el.appendChild(content)
                })
            }
            
        }

        elements.html = (content) => {
            if(content == null){
                return elements[0].innerHTML;
            }
            elements.forEach(el => {
                el.innerHTML = content;
            })
        }

        elements.text = (content) => {
            if(content == null){
                return elements[0].innerText;
            }
            elements.forEach(el => {
                el.innerText = content;
            })
        }

        //adding an event listener
        elements.on = (...args) => {
            
            if(args.length == 2){
                elements.forEach(el => {
                    console.log(1)
                    el.addEventListener(args[0],args[1]);
                })
            }
            else if(args.length == 3){
                document.querySelectorAll(args[1]).forEach(el => {
                    el.addEventListener(args[0],args[2]);
                })
            }
            
        }

        //creating click event
        elements.click = (fn) => {

            elements.forEach(el => {
                el.addEventListener('click',fn);
            })
        }

        elements.dblclick = (fn) => {
            elements.forEach(el => {
                el.addEventListener('click',fn);
            })
        }

        elements.mousedown = (fn) => {
            elements.forEach(el => {
                el.addEventListener('mousedown',fn);
            })
        }

        elements.hover = (enterfn,leavefn) => {
            elements.forEach(el => {
                el.addEventListener('mouseenter',enterfn);
                el.addEventListener('mouseleave',leavefn);
            })
        }

        elements.change = callback => {
            elements.forEach(el => {
                el.addEventListener('change',callback);
            })
        }

        //key events

        elements.keyup = (fn) => {
            elements.forEach(el => {
                el.addEventListener('keyup',fn);
            })
        }

        elements.keydown = (fn) => {
            elements.forEach(el => {
                el.addEventListener('keydown',fn);
            })
        }

        elements.keypress = (fn) => {
            elements.forEach(el => {
                el.addEventListener('keypress',fn);
            })
        }

        elements.width = () => {
            return elements[0].width;
        }

        elements.height = () => {
            return elements[0].width;
        }




        elements.val = (text) => {
            if(text == null){
                return elements[0].value;
            }
            elements[0].value = text;
        }

        //animations

        elements.fadeIn = () => {
            elements.forEach(el => {
                el.style.opacity = 0;
                el.style.display = "block";
                (function fade() {
                    var val = parseFloat(el.style.opacity);
                    if (!((val += .1) > 1)) {
                        el.style.opacity = val;
                        requestAnimationFrame(fade);
                    }
                })();
            })
        }

       
        return elements;
    }

    //document ready function that is called as such "$(function() { }"
    else if(typeof args[0] === 'function'){
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(args[0], 1);
        } else {
            document.addEventListener("DOMContentLoaded", args[0]);
        }
    }
}

get = (url ,success,failure) => {
    fetch(url)
    .then(response => response.json())
    .then(data => success(data))
    .catch(err => failure(err));
}