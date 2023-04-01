(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/malinajs/runtime.js
  function $watch(cd, fn, callback, w) {
    if (!w)
      w = {};
    w.fn = fn;
    w.cb = callback;
    if (!("value" in w))
      w.value = NaN;
    cd.watchers.push(w);
    return w;
  }
  function $watchReadOnly(cd, fn, callback) {
    return $watch(cd, fn, callback, { ro: true });
  }
  function cd_onDestroy(cd, fn) {
    if (fn)
      cd._d.push(fn);
  }
  function $$removeItem(array, item) {
    let i = array.indexOf(item);
    if (i >= 0)
      array.splice(i, 1);
  }
  function $ChangeDetector(parent) {
    this.parent = parent;
    this.children = [];
    this.watchers = [];
    this._d = [];
    this.prefix = [];
    this.$$ = parent?.$$;
  }
  function cloneDeep(d, lvl) {
    if (lvl < 0 || !d)
      return d;
    if (isObject(d)) {
      if (d instanceof Date)
        return d;
      if (d instanceof Element)
        return d;
      if (isArray(d))
        return d.map((i) => cloneDeep(i, lvl - 1));
      let r = {};
      for (let k in d)
        r[k] = cloneDeep(d[k], lvl - 1);
      return r;
    }
    return d;
  }
  function $$deepComparator(depth) {
    return function(w, value) {
      let diff = compareDeep(w.value, value, depth);
      diff && (w.value = cloneDeep(value, depth), !w.idle && w.cb(value));
      w.idle = false;
      return !w.ro && diff ? 1 : 0;
    };
  }
  function $digest($cd) {
    let loop = 10;
    let w;
    while (loop >= 0) {
      let changes = 0;
      let index = 0;
      let queue = [];
      let i, value, cd = $cd;
      while (cd) {
        for (i = 0; i < cd.prefix.length; i++)
          cd.prefix[i]();
        for (i = 0; i < cd.watchers.length; i++) {
          w = cd.watchers[i];
          value = w.fn();
          if (w.value !== value) {
            if (w.cmp) {
              changes += w.cmp(w, value);
            } else {
              w.value = value;
              if (!w.ro)
                changes++;
              w.cb(w.value);
            }
          }
        }
        if (cd.children.length)
          queue.push.apply(queue, cd.children);
        cd = queue[index++];
      }
      loop--;
      if (!changes)
        break;
    }
    if (loop < 0)
      __app_onerror("Infinity changes: ", w);
  }
  function svgToFragment(content) {
    if (templatecacheSvg[content])
      return templatecacheSvg[content].cloneNode(true);
    let t = document.createElement("template");
    t.innerHTML = "<svg>" + content + "</svg>";
    let result = document.createDocumentFragment();
    let svg = t.content[firstChild];
    while (svg[firstChild])
      result.appendChild(svg[firstChild]);
    templatecacheSvg[content] = result.cloneNode(true);
    return result;
  }
  function $$removeElements(el, last) {
    let next;
    while (el) {
      next = el.nextSibling;
      el.remove();
      if (el == last)
        break;
      el = next;
    }
  }
  function removeElementsBetween(el, stop) {
    let next;
    el = el.nextSibling;
    while (el) {
      next = el.nextSibling;
      if (el == stop)
        break;
      el.remove();
      el = next;
    }
  }
  function $tick(fn, uniq) {
    if (uniq) {
      if (_tick_planned[uniq])
        return;
      _tick_planned[uniq] = true;
    }
    _tick_list.push(fn);
    if (_tick_planned.$tick)
      return;
    _tick_planned.$tick = true;
    Promise.resolve().then(() => {
      _tick_planned = {};
      let list = _tick_list;
      _tick_list = [];
      list.map(safeCall);
    });
  }
  function $$htmlBlock($cd, tag, fn) {
    let lastElement;
    let create = (html) => {
      let fr;
      if (tag.parentElement instanceof SVGElement)
        fr = svgToFragment(html);
      else
        fr = $$htmlToFragment(html);
      lastElement = fr.lastChild;
      insertAfter(tag, fr);
    };
    let destroy = () => {
      if (!lastElement)
        return;
      let next, el = tag.nextSibling;
      while (el) {
        next = el.nextSibling;
        el.remove();
        if (el == lastElement)
          break;
        el = next;
      }
      lastElement = null;
    };
    $watch($cd, fn, (html) => {
      destroy();
      if (html)
        create(html);
    }, { ro: true });
  }
  function $$ifBlock($cd, $parentElement, fn, tpl, build, tplElse, buildElse) {
    let childCD;
    let first, last;
    function create(fr, builder) {
      childCD = $cd.new();
      let tpl2 = fr.cloneNode(true);
      builder(childCD, tpl2);
      first = tpl2[firstChild];
      last = tpl2.lastChild;
      insertAfter($parentElement, tpl2);
    }
    function destroy() {
      if (!childCD)
        return;
      childCD.destroy();
      childCD = null;
      $$removeElements(first, last);
      first = last = null;
    }
    $watch($cd, fn, (value) => {
      if (value) {
        destroy();
        create(tpl, build);
      } else {
        destroy();
        if (buildElse)
          create(tplElse, buildElse);
      }
    });
  }
  var __app_onerror, isFunction, isObject, safeCall, isArray, compareDeep, $$compareDeep, keyComparator, fire, templatecache, templatecacheSvg, $$uniqIndex, childNodes, firstChild, noop, insertAfter, $$htmlToFragment, $$htmlToFragmentClean, getFinalLabel, _tick_list, _tick_planned, current_component, $context, $onDestroy, $insertElementByOption, $base, makeComponent, callComponent, autoSubscribe, bindText;
  var init_runtime = __esm({
    "node_modules/malinajs/runtime.js"() {
      __app_onerror = console.error;
      isFunction = (fn) => typeof fn == "function";
      isObject = (d) => typeof d == "object";
      safeCall = (fn) => {
        try {
          return isFunction(fn) && fn();
        } catch (e) {
          __app_onerror(e);
        }
      };
      $ChangeDetector.prototype.new = function() {
        var cd = new $ChangeDetector(this);
        this.children.push(cd);
        return cd;
      };
      $ChangeDetector.prototype.destroy = function(option) {
        if (option !== false && this.parent)
          $$removeItem(this.parent.children, this);
        this.watchers.length = 0;
        this.prefix.length = 0;
        this._d.map(safeCall);
        this._d.length = 0;
        this.children.map((cd) => cd.destroy(false));
        this.children.length = 0;
      };
      isArray = (a) => Array.isArray(a);
      compareDeep = (a, b, lvl) => {
        if (lvl < 0 || !a || !b)
          return a !== b;
        if (a === b)
          return false;
        let o0 = isObject(a);
        let o1 = isObject(b);
        if (!(o0 && o1))
          return a !== b;
        let a0 = isArray(a);
        let a1 = isArray(b);
        if (a0 !== a1)
          return true;
        if (a0) {
          if (a.length !== b.length)
            return true;
          for (let i = 0; i < a.length; i++) {
            if (compareDeep(a[i], b[i], lvl - 1))
              return true;
          }
        } else {
          let set = {};
          for (let k in a) {
            if (compareDeep(a[k], b[k], lvl - 1))
              return true;
            set[k] = true;
          }
          for (let k in b) {
            if (set[k])
              continue;
            return true;
          }
        }
        return false;
      };
      $$compareDeep = $$deepComparator(10);
      keyComparator = (w, value) => {
        let diff = false;
        for (let k in value) {
          if (w.value[k] != value[k])
            diff = true;
          w.value[k] = value[k];
        }
        diff && !w.idle && w.cb(value);
        w.idle = false;
        return !w.ro && diff ? 1 : 0;
      };
      fire = (w) => {
        if (w.cmp)
          w.cmp(w, w.fn());
        else {
          w.value = w.fn();
          w.cb(w.value);
        }
      };
      templatecache = {};
      templatecacheSvg = {};
      $$uniqIndex = 1;
      childNodes = "childNodes";
      firstChild = "firstChild";
      noop = (a) => a;
      insertAfter = (label, node) => {
        label.parentNode.insertBefore(node, label.nextSibling);
      };
      $$htmlToFragment = (html) => {
        if (templatecache[html])
          return templatecache[html].cloneNode(true);
        let t = document.createElement("template");
        t.innerHTML = html.replace(/<>/g, "<!---->");
        let result = t.content;
        templatecache[html] = result.cloneNode(true);
        return result;
      };
      $$htmlToFragmentClean = (html) => {
        if (templatecache[html])
          return templatecache[html].cloneNode(true);
        let t = document.createElement("template");
        t.innerHTML = html.replace(/<>/g, "<!---->");
        let result = t.content;
        let it = document.createNodeIterator(result, 128);
        let n;
        while (n = it.nextNode()) {
          if (!n.nodeValue)
            n.parentNode.replaceChild(document.createTextNode(""), n);
        }
        templatecache[html] = result.cloneNode(true);
        return result;
      };
      getFinalLabel = (n) => {
        if (n.nextSibling)
          return n.nextSibling;
        let e = document.createTextNode("");
        n.parentNode.appendChild(e);
        return e;
      };
      _tick_list = [];
      _tick_planned = {};
      $onDestroy = (fn) => current_component._d.push(fn);
      $insertElementByOption = ($label, $option, $element) => {
        if ($option.$l) {
          insertAfter($label, $element);
        } else {
          $label.appendChild($element);
        }
      };
      $base = {
        a: ($component) => {
          let $cd = new $ChangeDetector();
          $cd.$$ = $component;
          $onDestroy(() => $cd.destroy());
          let id = `a${$$uniqIndex++}`;
          let process;
          let apply = (r) => {
            if (process)
              return r;
            $tick(() => {
              try {
                process = true;
                $digest($cd);
              } finally {
                process = false;
              }
            }, id);
            return r;
          };
          $component.$cd = $cd;
          $component.apply = apply;
          $component.push = apply;
          apply();
        },
        b: noop
      };
      makeComponent = (init, $base2) => {
        return ($element, $option = {}) => {
          let prev = current_component;
          $context = $option.context || {};
          let $component = current_component = {
            $option,
            destroy: () => $component._d.map(safeCall),
            context: $context,
            exported: {},
            _d: [],
            _m: []
          };
          $base2.a($component);
          try {
            $insertElementByOption($element, $option, init($option, $component.apply));
            $base2.b($component);
          } finally {
            current_component = prev;
            $context = null;
          }
          $tick(() => $component._d.push(...$component._m.map(safeCall)));
          return $component;
        };
      };
      callComponent = (cd, context, component, label, option, propFn, cmp, setter, classFn) => {
        option.$l = 1;
        option.context = { ...context };
        let $component, parentWatch, childWatch;
        if (propFn) {
          if (cmp) {
            parentWatch = $watch(cd, propFn, (value) => {
              option.props = value;
              if ($component) {
                $component.push?.();
                childWatch && (childWatch.idle = true);
                $component.apply?.();
              }
            }, { ro: true, value: {}, cmp });
            fire(parentWatch);
          } else
            option.props = propFn();
        }
        if (classFn) {
          fire($watch(cd, classFn, (value) => {
            option.$class = value;
            $component?.apply?.();
          }, { ro: true, value: {}, cmp: keyComparator }));
        }
        $component = safeCall(() => component(label, option));
        if ($component) {
          cd_onDestroy(cd, $component.destroy);
          if (setter && $component.exportedProps) {
            childWatch = $watch($component.$cd, $component.exportedProps, (value) => {
              setter(value);
              cd.$$.apply();
            }, { ro: true, idle: true, value: parentWatch.value, cmp });
          }
        }
        return $component;
      };
      autoSubscribe = (...list) => {
        list.forEach((i) => {
          if (isFunction(i.subscribe)) {
            let unsub = i.subscribe(current_component.apply);
            if (isFunction(unsub))
              cd_onDestroy(current_component, unsub);
          }
        });
      };
      bindText = (cd, element, fn) => {
        $watchReadOnly(cd, () => "" + fn(), (value) => {
          element.textContent = value;
        });
      };
    }
  });

  // src/pages/About/index.xht
  var About_exports = {};
  __export(About_exports, {
    default: () => About_default
  });
  var About_default;
  var init_About = __esm({
    "src/pages/About/index.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      About_default = makeComponent(($option, $$apply) => {
        const $component = current_component;
        let $props = $option.props || {};
        let { params } = $props;
        current_component.push = () => ({ params = params } = $props = $option.props || {});
        current_component.exportedProps = () => ({ params });
        {
          let $cd = $component.$cd;
          const $parentElement = $$htmlToFragmentClean(`<article> <h1>About</h1> <h4> </h4> <hr/> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iure, nam molestias quo ex vel iusto obcaecati consectetur provident nostrum repellat doloremque atque vero porro quis cumque quaerat, ea in?</p> <p>Fuga unde quibusdam sapiente quam dignissimos, cumque vitae esse, debitis corrupti magnam voluptatem asperiores iste obcaecati odit repudiandae, doloribus consectetur quis inventore.</p> <br/> <a href="/" class="button">Go Home</a> </article>`);
          let el0 = $parentElement[firstChild][childNodes][3][firstChild];
          bindText($cd, el0, () => `Something about ` + params.$1 + `.`);
          return $parentElement;
        }
      }, $base);
    }
  });

  // malinacss:C:/Users/yulmizar/Documents/GIT/workspace/demo/demo-spa/src/pages/Home.malina.css
  var init_ = __esm({
    "malinacss:C:/Users/yulmizar/Documents/GIT/workspace/demo/demo-spa/src/pages/Home.malina.css"() {
    }
  });

  // src/pages/Home.xht
  var Home_exports = {};
  __export(Home_exports, {
    default: () => Home_default
  });
  var Home_default;
  var init_Home = __esm({
    "src/pages/Home.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      init_();
      Home_default = makeComponent(($option, $$apply) => {
        const $component = current_component;
        let $props = $option.props || {};
        let { params } = $props;
        current_component.push = () => ({ params = params } = $props = $option.props || {});
        current_component.exportedProps = () => ({ params });
        console.log(params);
        {
          let $cd = $component.$cd;
          const $parentElement = $$htmlToFragmentClean(`<nav class="mbganwa"> <h1>MalinaJS</h1> <div><h3>Our focus is to build production and distribution systems that are environmentally friendly, build the capabilities of workers and communities, present digital solutions to be closer to consumers, and ensure a positive impact for the future.</h3> <br/> <a href="/learn" class="mbganwa button warning">Learn More</a></div> </nav> <article class="mbganwa"> <section> <h3>Profile</h3> <p>Sed nesciunt facere aspernatur culpa officia maxime voluptatum numquam accusantium adipisci, nemo tenetur, eum quibusdam odio similique quidem repellat eaque beatae veniam?</p> <a href="/user/profile" class="button">More</a> </section> <section> <h3>Setting</h3> <p>Dolorem iure aperiam repellat ipsum tenetur odio eum laboriosam autem eveniet aut necessitatibus aspernatur deleniti, fugit consequatur? Itaque incidunt quis quisquam quibusdam?</p> <a href="/user/setting" class="button">More</a> </section> <section> <h3>About</h3> <p>Accusamus ex molestias ullam cum fugiat fuga autem, iste ut necessitatibus. Accusamus rerum ipsam porro ipsa quidem, totam nobis nostrum unde suscipit.</p> <a href="/about/us" class="button">More</a> </section> </article>`);
          return $parentElement;
        }
      }, $base);
    }
  });

  // src/pages/Learn.xht
  var Learn_exports = {};
  __export(Learn_exports, {
    default: () => Learn_default
  });
  var Learn_default;
  var init_Learn = __esm({
    "src/pages/Learn.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      Learn_default = ($element, $option = {}) => {
        {
          const $parentElement = $$htmlToFragmentClean(`<article> <h1>Learn</h1> <h4>Something to learn about MalinaJS.</h4> <hr/> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iure, nam molestias quo ex vel iusto obcaecati consectetur provident nostrum repellat doloremque atque vero porro quis cumque quaerat, ea in?</p> <p>Fuga unde quibusdam sapiente quam dignissimos, cumque vitae esse, debitis corrupti magnam voluptatem asperiores iste obcaecati odit repudiandae, doloribus consectetur quis inventore.</p> <br/> <a href="/" class="button">Go Home</a> </article>`);
          $insertElementByOption($element, $option, $parentElement);
        }
      };
    }
  });

  // malinacss:C:/Users/yulmizar/Documents/GIT/workspace/demo/demo-spa/src/module/Error.malina.css
  var init_2 = __esm({
    "malinacss:C:/Users/yulmizar/Documents/GIT/workspace/demo/demo-spa/src/module/Error.malina.css"() {
    }
  });

  // src/module/Error.xht
  var Error_exports = {};
  __export(Error_exports, {
    default: () => Error_default
  });
  var Error_default;
  var init_Error = __esm({
    "src/module/Error.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      init_2();
      Error_default = makeComponent(($option, $$apply) => {
        const $component = current_component;
        let $props = $option.props || {};
        let { num = 404, nfo = "page not found", msg = "Page you are looking for is not found.<br>Probably eaten by a snake." } = $props;
        current_component.push = () => ({ num = num, nfo = nfo, msg = msg } = $props = $option.props || {});
        current_component.exportedProps = () => ({ num, nfo, msg });
        {
          let $cd = $component.$cd;
          const $parentElement = $$htmlToFragmentClean(`<hgroup class="m8gedwf"> <h1> </h1> <h6 class="m8gedwf"> </h6> <p class="m8gedwf"><></p> </hgroup>`);
          let el0 = $parentElement[firstChild][childNodes][1][firstChild];
          let el1 = $parentElement[firstChild][childNodes][3][firstChild];
          let el2 = $parentElement[firstChild][childNodes][5][firstChild];
          bindText($cd, el0, () => num);
          bindText($cd, el1, () => nfo);
          $$htmlBlock($cd, el2, () => msg);
          return $parentElement;
        }
      }, $base);
    }
  });

  // src/pages/user/+page.xht
  var page_exports = {};
  __export(page_exports, {
    default: () => page_default
  });
  var page_default;
  var init_page = __esm({
    "src/pages/user/+page.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      page_default = makeComponent(($option, $$apply) => {
        const $component = current_component;
        let $props = $option.props || {};
        let { params } = $props;
        current_component.push = () => ({ params = params } = $props = $option.props || {});
        current_component.exportedProps = () => ({ params });
        console.log(params);
        {
          let $cd = $component.$cd;
          const $parentElement = $$htmlToFragmentClean(`<article> <hgroup> <h1>List of user</h1> <h3>Sublist of user</h3> </hgroup> </article>`);
          return $parentElement;
        }
      }, $base);
    }
  });

  // src/pages/user/+profile.xht
  var profile_exports = {};
  __export(profile_exports, {
    default: () => profile_default
  });
  var profile_default;
  var init_profile = __esm({
    "src/pages/user/+profile.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      profile_default = ($element, $option = {}) => {
        {
          const $parentElement = $$htmlToFragmentClean(`<article> <h1>Profile</h1> <h4>Something about profile</h4> <hr/> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iure, nam molestias quo ex vel iusto obcaecati consectetur provident nostrum repellat doloremque atque vero porro quis cumque quaerat, ea in?</p> <p>Fuga unde quibusdam sapiente quam dignissimos, cumque vitae esse, debitis corrupti magnam voluptatem asperiores iste obcaecati odit repudiandae, doloribus consectetur quis inventore.</p> <br/> <a href="/" class="button">Go Home</a> </article>`);
          $insertElementByOption($element, $option, $parentElement);
        }
      };
    }
  });

  // src/pages/user/+setting.xht
  var setting_exports = {};
  __export(setting_exports, {
    default: () => setting_default
  });
  var setting_default;
  var init_setting = __esm({
    "src/pages/user/+setting.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      setting_default = ($element, $option = {}) => {
        {
          const $parentElement = $$htmlToFragmentClean(`<article> <h1>Setting</h1> <h4>Something mandatory to setup.</h4> <hr/> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iure, nam molestias quo ex vel iusto obcaecati consectetur provident nostrum repellat doloremque atque vero porro quis cumque quaerat, ea in?</p> <p>Fuga unde quibusdam sapiente quam dignissimos, cumque vitae esse, debitis corrupti magnam voluptatem asperiores iste obcaecati odit repudiandae, doloribus consectetur quis inventore.</p> <br/> <a href="/" class="button">Go Home</a> </article>`);
          $insertElementByOption($element, $option, $parentElement);
        }
      };
    }
  });

  // src/pages/user/index.js
  var user_default;
  var init_user = __esm({
    "src/pages/user/index.js"() {
      user_default = (page, dynImport) => {
        if (!page)
          return;
        else if (page === "page")
          dynImport(Promise.resolve().then(() => (init_page(), page_exports)));
        else if (page === "profile")
          dynImport(Promise.resolve().then(() => (init_profile(), profile_exports)));
        else if (page === "setting")
          dynImport(Promise.resolve().then(() => (init_setting(), setting_exports)));
      };
    }
  });

  // src/pages/user/pageIndex.xht
  var pageIndex_exports = {};
  __export(pageIndex_exports, {
    default: () => pageIndex_default
  });
  var pageIndex_default;
  var init_pageIndex = __esm({
    "src/pages/user/pageIndex.xht"() {
      init_runtime();
      init_runtime();
      init_runtime();
      init_Error();
      init_user();
      pageIndex_default = makeComponent(($option, $$apply) => {
        const $component = current_component;
        let $props = $option.props || {};
        const $context2 = $context;
        autoSubscribe(user_default);
        let { params } = $props;
        current_component.push = () => ({ params = params } = $props = $option.props || {});
        current_component.exportedProps = () => ({ params });
        let cmp;
        const dynImport = (o) => $$apply(o.then((m) => $$apply(cmp = m.default)));
        {
          let $cd = $component.$cd;
          const $parentElement = $$htmlToFragmentClean(`<>`);
          let el2 = $parentElement[firstChild];
          $$ifBlock(
            $cd,
            el2,
            () => !!cmp,
            $$htmlToFragmentClean(` <> `),
            ($cd2, $parentElement2) => {
              let el0 = $parentElement2[childNodes][1];
              {
                let childCD, finalLabel = getFinalLabel(el0);
                $watch($cd2, () => cmp, ($ComponentConstructor) => {
                  if (childCD) {
                    childCD.destroy();
                    removeElementsBetween(el0, finalLabel);
                  }
                  childCD = null;
                  if ($ComponentConstructor) {
                    childCD = $cd2.new();
                    callComponent(
                      childCD,
                      $context2,
                      $ComponentConstructor,
                      el0,
                      {},
                      () => ({ params }),
                      keyComparator
                    );
                  }
                });
              }
            },
            $$htmlToFragmentClean(` <> `),
            ($cd2, $parentElement2) => {
              let el1 = $parentElement2[childNodes][1];
              callComponent($cd2, $context2, Error_default, el1, {});
            }
          );
          $watch($cd, () => params, () => {
            user_default(params.$1, dynImport);
          });
          return $parentElement;
        }
      }, $base);
    }
  });

  // src/App.xht
  init_runtime();
  init_runtime();
  init_runtime();

  // node_modules/malinajs-trouter/index.js
  function router(routes, callback, err) {
    if (!routes)
      return $;
    const regex = (path) => new RegExp(
      "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
    );
    const start = (uri) => {
      if (typeof uri === "string")
        history.pushState(null, null, uri);
      const params = () => {
        const values = location.pathname.split("/").slice(2);
        let obj = {};
        for (let i = 0; i < values.length; i++) {
          obj[`$${i + 1}`] = values[i];
        }
        return obj;
      };
      const match = routes.filter((route) => {
        let path = regex(route.path);
        return location.pathname.match(path);
      })[0];
      if (match) {
        new Promise((resolve) => {
          match.page.then(
            (m) => resolve(
              callback({
                cmp: m.default,
                params: params()
              })
            )
          );
        });
      } else if (typeof err === "object") {
        new Promise((resolve) => {
          err.then(
            (m) => resolve(
              callback({
                cmp: m.default
              })
            )
          );
        });
      } else if (typeof err === "function") {
        callback({
          cmp: err
        });
      } else
        console.log("404 \u261B Page not found!");
      return;
    };
    addEventListener("popstate", start);
    addEventListener("replacestate", start);
    addEventListener("pushstate", start);
    document.body.addEventListener("click", (ev) => {
      const isActive = ev.target.getAttribute("href");
      if (isActive) {
        ev.preventDefault();
        start(isActive);
      }
    });
    start(location.pathname);
  }
  var malinajs_trouter_default = router;

  // src/routes.js
  var routes_default = [
    {
      path: "/about/:page",
      page: Promise.resolve().then(() => (init_About(), About_exports))
    },
    {
      path: "/",
      page: Promise.resolve().then(() => (init_Home(), Home_exports))
    },
    {
      path: "/learn",
      page: Promise.resolve().then(() => (init_Learn(), Learn_exports))
    },
    {
      path: "/user/:page",
      page: Promise.resolve().then(() => (init_pageIndex(), pageIndex_exports))
    }
  ];

  // src/App.xht
  var App_default = makeComponent(($option, $$apply) => {
    const $component = current_component;
    const $context2 = $context;
    autoSubscribe(routes_default);
    let cmp, params, active, uri;
    const error404 = Promise.resolve().then(() => (init_Error(), Error_exports));
    malinajs_trouter_default(routes_default, (result) => {
      $$apply();
      cmp = result.cmp;
      params = result.params;
    }, error404);
    {
      let $cd = $component.$cd;
      const $parentElement = $$htmlToFragmentClean(`<>`);
      let el1 = $parentElement[firstChild];
      $$ifBlock(
        $cd,
        el1,
        () => !!cmp,
        $$htmlToFragmentClean(` <main> <> </main> `),
        ($cd2, $parentElement2) => {
          let el0 = $parentElement2[childNodes][1][childNodes][1];
          {
            let childCD, finalLabel = getFinalLabel(el0);
            $watch($cd2, () => cmp, ($ComponentConstructor) => {
              if (childCD) {
                childCD.destroy();
                removeElementsBetween(el0, finalLabel);
              }
              childCD = null;
              if ($ComponentConstructor) {
                childCD = $cd2.new();
                callComponent(
                  childCD,
                  $context2,
                  $ComponentConstructor,
                  el0,
                  {},
                  () => ({ params }),
                  keyComparator
                );
              }
            });
          }
        }
      );
      $watch($cd, () => location.pathname, () => {
        uri = location.pathname;
        active = uri.split("/")[1] || "home";
      });
      return $parentElement;
    }
  }, $base);

  // src/main.js
  App_default(document.body);
})();
