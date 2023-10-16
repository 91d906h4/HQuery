var $ = function (element) {
    if (!(this instanceof $)) {
        return new $(element);
    }

    this.element = document.querySelectorAll(element);

    return this;
}

$.prototype = {
    // Events.
    click: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("click", func, false);
        });

        return this;
    },

    dbclick: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("dbclick", func, false);
        });

        return this;
    },

    mouseenter: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("mouseenter", func, false);
        });

        return this;
    },

    mouseleave: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("mouseleave", func, false);
        });

        return this;
    },

    keypress: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("keypress", func, false);
        });

        return this;
    },

    keydown: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("keydown", func, false);
        });

        return this;
    },

    keyup: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("keyup", func, false);
        });

        return this;
    },

    submit: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("submit", func, false);
        });

        return this;
    },

    change: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("change", func, false);
        });

        return this;
    },

    focus: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("focus", func, false);
        });

        return this;
    },

    blur: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("blur", func, false);
        });

        return this;
    },

    load: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("load", func, false);
        });

        return this;
    },

    resize: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("resize", func, false);
        });

        return this;
    },

    scroll: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("scroll", func, false);
        });

        return this;
    },

    unload: function (func) {
        this.element.forEach(function (element) {
            element.addEventListener("unload", func, false);
        });

        return this;
    },
    // End of events.

    // Show & Hide.
    hide: function () {
        this.element.forEach(function (element) {
            element.style.display = "none";
        });

        return this;
    },

    show: function () {
        this.element.forEach(function (element) {
            element.style.removeProperty("display");
        });

        return this;
    },

    toggle: function () {
        this.element.forEach(function (element) {
            if (element.style.display === "none") {
                element.style.removeProperty("display");
            }
            else {
                element.style.display = "none";
            }
        });

        return this;
    },
    // End of Show & Hide.

    // Fade.
    fadeIn: function (duration) {
        this.element.forEach(function (element) {
            if (duration === undefined) duration = 500;
            if (element.style.display !== "none") return this;
            else element.style.removeProperty("display");

            let start;
            function step(timestamp) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                element.style.opacity = progress;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });

        return this;
    },

    fadeOut: function (duration) {
        this.element.forEach(function (element) {
            if (duration === undefined) duration = 500;
            if (element.style.display === "none") return this;

            let start;
            function step(timestamp) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                element.style.opacity = 1 - progress;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.style.display = "none";
                }
            }

            requestAnimationFrame(step);
        });

        return this;
    },
    // End of Fade.

    // Slide.
    slideDown: function (duration) {
        this.element.forEach(function (element) {
            if (duration === undefined) duration = 500;
            if (element.style.display !== "none") return this;
            else element.style.removeProperty("display");

            const height = element.offsetHeight;
            let start;

            function step(timestamp) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                element.style.height = `${height * progress}px`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });

        return this;
    },

    slideUp: function (duration) {
        this.element.forEach(function (element) {
            if (duration === undefined) duration = 500;
            if (element.style.display === "none") return;

            const height = element.offsetHeight;
            let start;

            function step(timestamp) {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                element.style.height = `${height - height * progress}px`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.style.display = "none";
                }
            }

            requestAnimationFrame(step);
        });

        return this;
    },
    // End of slide.

    // Ajax.
    get: async function (url, func) {
        try {
            const target = await fetch(url, {
                method: "GET",
                mode: "cors",
            });
            const response = await target.json();
            const data = response.data, status = "success";

            func(data, status);
        }
        catch (error) {
            func(undefined, "failed");
        }
    },

    post: async function (url, send_data, func) {
        try {
            const target = await fetch(url, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(send_data)
            });
            const response = await target.json();
            const data = response.data, status = "success";

            func(data, status);
        }
        catch (error) {
            func(undefined, "failed");
        }
    },
    // End of Ajax.

    // HTML.
    text: function (content) {
        if (content === undefined) return this.element[0].textContent;
        else this.element[0].textContent = content;
    },

    html: function (content) {
        if (content === undefined) return this.element[0].innerHTML;
        else this.element[0].innerHTML = content;
    },

    val: function (content) {
        if (content === undefined) return this.element[0].value;
        else this.element[0].value = content;
    },

    attr: function (name, value) {
        if (name === undefined) return this;
        else if (typeof name === "object") {
            for (var [key, val] of Object.entries(name)) {
                this.element.forEach(function (element) {
                    element.setAttribute(key, val);
                });
            }
        }
        else {
            this.element.forEach(function (element) {
                element.setAttribute(name, value);
            });
        }

        return this;
    },

    append: function (content) {
        if (content !== undefined) {
            this.element.forEach(function (element) {
                element.innerHTML += content;
            });
        }

        return this;
    },

    prepend: function (content) {
        if (content !== undefined) {
            this.element.forEach(function (element) {
                element.innerHTML = content + element.innerHTML;
            });
        }

        return this;
    },

    remove: function () {
        this.element.forEach(function (element) {
            element.remove();
        });

        return this;
    },

    empty: function () {
        this.element.forEach(function (element) {
            while (element.firstElementChild) {
                element.firstElementChild.remove();
            }
        });

        return this;
    },

    addClass: function (names) {
        names = names.split(" ");
        this.element.forEach(function (element) {
            names.forEach((name) => {
                element.classList.add(name);
            });
        });

        return this;
    },

    removeClass: function (names) {
        names = names.split(" ");
        this.element.forEach(function (element) {
            names.forEach((name) => {
                element.classList.remove(name);
            });
        });

        return this;
    },

    css: function (name, value) {
        if (name === undefined) return this;
        else if (typeof name === "object") {
            for (var [key, val] of Object.entries(name)) {
                this.element.forEach(function (element) {
                    element.style[key] = val;
                });
            }
        }
        else if (value === undefined) {
            let style = getComputedStyle(this.element[0]);
            return style[name];
        }
        else {
            this.element[0].style[name] = value;
        }

        return this;
    },
    // End of HTML.

    // Utility.
    // End of utility.
}