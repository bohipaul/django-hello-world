var among;
var hasRequiredAmong;
function requireAmong() {
  if (hasRequiredAmong) return among;
  hasRequiredAmong = 1;
  class Among {
    constructor(s, sub, result, method, instance) {
      this.s_size = s.length;
      this.s = s;
      this.substring_i = sub;
      this.result = result;
      this.method = method;
      this.instance = instance;
    }
  }
  among = Among;
  return among;
}
var helper;
var hasRequiredHelper;
function requireHelper() {
  if (hasRequiredHelper) return helper;
  hasRequiredHelper = 1;
  const rsAstralRange = "\\ud800-\\udfff";
  const rsComboMarksRange = "\\u0300-\\u036f";
  const reComboHalfMarksRange = "\\ufe20-\\ufe2f";
  const rsComboSymbolsRange = "\\u20d0-\\u20ff";
  const rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
  const rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
  const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
  const rsVarRange = "\\ufe0e\\ufe0f";
  const rsAstral = `[${rsAstralRange}]`;
  const rsCombo = `[${rsComboRange}]`;
  const rsFitz = "\\ud83c[\\udffb-\\udfff]";
  const rsModifier = `(?:${rsCombo}|${rsFitz})`;
  const rsNonAstral = `[^${rsAstralRange}]`;
  const rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  const rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  const rsZWJ = "\\u200d";
  const reOptMod = `${rsModifier}?`;
  const rsOptVar = `[${rsVarRange}]?`;
  const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join(
    "|"
  )})${rsOptVar + reOptMod})*`;
  const rsSeq = rsOptVar + reOptMod + rsOptJoin;
  const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`;
  const rsSymbol = `(?:${[
    rsNonAstralCombo,
    rsCombo,
    rsRegional,
    rsSurrPair,
    rsAstral
  ].join("|")})`;
  const reHasUnicode = RegExp(
    `[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`
  );
  const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, "g");
  const hasUnicode = (str) => reHasUnicode.test(str);
  const unicodeToArray = (str) => str.match(reUnicode) || [];
  const asciiToArray = (str) => str.split("");
  const stringToArray = (str) => hasUnicode(str) ? unicodeToArray(str) : asciiToArray(str);
  function compareWildcars(text, rule) {
    const escapeRegex = (str) => str.replace(/([.*+^=!:${}()|[\]/\\])/g, "\\$1");
    const regexRule = `^${rule.split("*").map(escapeRegex).join(".*")}$`.replace(
      /\?/g,
      "."
    );
    return new RegExp(regexRule).test(text);
  }
  function loadEnvFromJson(preffix, json = {}) {
    const keys = Object.keys(json);
    preffix = preffix ? `${preffix}_` : "";
    for (let i = 0; i < keys.length; i += 1) {
      `${preffix}${keys[i]}`;
      json[keys[i]];
    }
  }
  helper = {
    hasUnicode,
    unicodeToArray,
    asciiToArray,
    stringToArray,
    compareWildcars,
    loadEnvFromJson
  };
  return helper;
}
var defaultCompiler;
var hasRequiredDefaultCompiler;
function requireDefaultCompiler() {
  if (hasRequiredDefaultCompiler) return defaultCompiler;
  hasRequiredDefaultCompiler = 1;
  class DefaultCompiler {
    constructor(container2) {
      this.container = container2.container || container2;
      this.name = "default";
    }
    getTokenFromWord(word) {
      if (word.startsWith("//")) {
        return {
          type: "comment",
          value: word
        };
      }
      if ([
        "set",
        "delete",
        "get",
        "inc",
        "dec",
        "eq",
        "neq",
        "gt",
        "ge",
        "lt",
        "le",
        "label",
        "goto",
        "jne",
        "je"
      ].includes(word)) {
        return {
          type: word,
          arguments: []
        };
      }
      if (word.startsWith("$")) {
        return {
          type: "call",
          value: word.slice(1)
        };
      }
      return {
        type: "reference",
        value: word
      };
    }
    compile(pipeline) {
      const result = [];
      for (let i = 0; i < pipeline.length; i += 1) {
        const line = pipeline[i].trim();
        const words = line.split(" ");
        const tokens = [];
        let currentString = "";
        let currentQuote;
        for (let j = 0; j < words.length; j += 1) {
          const word = words[j];
          let processed = false;
          if (!currentQuote) {
            if (word.startsWith('"')) {
              currentString = word;
              processed = true;
              currentQuote = '"';
              if (word.endsWith('"')) {
                currentQuote = void 0;
                tokens.push(this.getTokenFromWord(currentString));
              }
            } else if (word.startsWith("'")) {
              currentString = word;
              processed = true;
              currentQuote = "'";
              if (word.endsWith("'")) {
                currentQuote = void 0;
                tokens.push(this.getTokenFromWord(currentString));
              }
            }
          } else {
            currentString = `${currentString} ${word}`;
            processed = true;
            if (word.endsWith(currentQuote)) {
              currentQuote = void 0;
              tokens.push(this.getTokenFromWord(currentString));
            }
          }
          if (!processed) {
            tokens.push(this.getTokenFromWord(word));
          }
        }
        result.push(tokens);
      }
      return result;
    }
    executeCall(firstToken, context2, input, srcObject, depth) {
      const pipeline = this.container.getPipeline(firstToken.value);
      if (!pipeline) {
        throw new Error(`Pipeline $${firstToken.value} not found.`);
      }
      return this.container.runPipeline(pipeline, input, srcObject, depth + 1);
    }
    executeReference(step, firstToken, context2, input, srcObject) {
      const currentObject = this.container.resolvePath(
        firstToken.value,
        context2,
        input,
        srcObject
      );
      const args = [];
      for (let i = 1; i < step.length; i += 1) {
        args.push(
          this.container.resolvePathWithType(
            step[i].value,
            context2,
            input,
            srcObject
          )
        );
      }
      if (!currentObject) {
        throw new Error(`Method not found for step ${JSON.stringify(step)}`);
      }
      const method = currentObject.run || currentObject;
      if (typeof method === "function") {
        return typeof currentObject === "function" ? method(input, ...args) : method.bind(currentObject)(input, ...args);
      }
      return method;
    }
    doGoto(label, srcContext) {
      const context2 = srcContext;
      const index = context2.labels[label];
      context2.cursor = index;
    }
    async executeAction(step, context2, input, srcObject, depth) {
      let firstToken = step[0];
      if (firstToken && firstToken.value && firstToken.value.startsWith("->")) {
        if (depth > 0) {
          return input;
        }
        firstToken = { ...firstToken };
        firstToken.value = firstToken.value.slice(2);
      }
      switch (firstToken.type) {
        case "set":
          this.container.setValue(
            step[1].value,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "delete":
          this.container.deleteValue(step[1].value, context2, input, srcObject);
          break;
        case "get":
          return this.container.getValue(
            step[1] ? step[1].value : void 0,
            context2,
            input,
            srcObject
          );
        case "inc":
          this.container.incValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : "1",
            context2,
            input,
            srcObject
          );
          break;
        case "dec":
          this.container.decValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : "1",
            context2,
            input,
            srcObject
          );
          break;
        case "eq":
          this.container.eqValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "neq":
          this.container.neqValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "gt":
          this.container.gtValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "ge":
          this.container.geValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "lt":
          this.container.ltValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "le":
          this.container.leValue(
            step[1] ? step[1].value : void 0,
            step[2] ? step[2].value : void 0,
            context2,
            input,
            srcObject
          );
          break;
        case "goto":
          this.doGoto(step[1].value, context2);
          break;
        case "jne":
          if (!context2.floating) {
            this.doGoto(step[1].value, context2);
          }
          break;
        case "je":
          if (context2.floating) {
            this.doGoto(step[1].value, context2);
          }
          break;
        case "call":
          return this.executeCall(firstToken, context2, input, srcObject, depth);
        case "reference":
          return this.executeReference(
            step,
            firstToken,
            context2,
            input,
            srcObject
          );
      }
      return input;
    }
    findLabels(compiled, srcLabels) {
      const labels = srcLabels;
      for (let i = 0; i < compiled.length; i += 1) {
        const current = compiled[i];
        if (current[0].type === "label") {
          labels[current[1].value] = i;
        }
      }
    }
    async execute(compiled, srcInput, srcObject, depth) {
      let input = srcInput;
      const context2 = { cursor: 0, labels: {} };
      this.findLabels(compiled, context2.labels);
      while (context2.cursor < compiled.length) {
        input = await this.executeAction(
          compiled[context2.cursor],
          context2,
          input,
          srcObject,
          depth
        );
        context2.cursor += 1;
      }
      return input;
    }
  }
  defaultCompiler = DefaultCompiler;
  return defaultCompiler;
}
var logger_1;
var hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return logger_1;
  hasRequiredLogger = 1;
  class Logger {
    constructor() {
      this.name = "logger";
    }
    debug(...args) {
      console.debug(...args);
    }
    info(...args) {
      console.info(...args);
    }
    warn(...args) {
      console.warn(...args);
    }
    error(...args) {
      console.error(...args);
    }
    log(...args) {
      console.log(...args);
    }
    trace(...args) {
      console.trace(...args);
    }
    fatal(...args) {
      console.error(...args);
    }
  }
  const logger = new Logger();
  logger_1 = logger;
  return logger_1;
}
var container;
var hasRequiredContainer;
function requireContainer() {
  if (hasRequiredContainer) return container;
  hasRequiredContainer = 1;
  const { compareWildcars } = requireHelper();
  const DefaultCompiler = requireDefaultCompiler();
  const logger = requireLogger();
  class Container {
    /**
     * Constructor of the class.
     */
    constructor(hasPreffix = false) {
      this.classes = {};
      this.factory = {};
      this.pipelines = {};
      this.configurations = {};
      this.compilers = {};
      this.cache = {
        bestKeys: {},
        pipelines: {}
      };
      this.registerCompiler(DefaultCompiler);
      if (!hasPreffix) {
        this.use(logger);
      }
    }
    registerCompiler(Compiler, name) {
      const instance = new Compiler(this);
      this.compilers[name || instance.name] = instance;
    }
    addClass(clazz, name) {
      this.classes[name || clazz.name] = clazz;
    }
    toJSON(instance) {
      const result = instance.toJSON ? instance.toJSON() : { ...instance };
      result.className = instance.constructor.name;
      return result;
    }
    fromJSON(obj, settings) {
      const Clazz = this.classes[obj.className];
      let instance;
      if (Clazz) {
        instance = new Clazz(settings);
        if (instance.fromJSON) {
          instance.fromJSON(obj);
        } else {
          Object.assign(instance, obj);
        }
      } else {
        instance = { ...obj };
      }
      delete instance.className;
      return instance;
    }
    register(name, Clazz, isSingleton = true) {
      this.cache.bestKeys = {};
      const isClass = typeof Clazz === "function";
      const item = { name, isSingleton };
      if (isSingleton) {
        item.instance = isClass ? new Clazz() : Clazz;
      } else {
        item.instance = isClass ? Clazz : Clazz.constructor;
      }
      this.factory[name] = item;
    }
    getBestKey(name) {
      if (this.cache.bestKeys[name] !== void 0) {
        return this.cache.bestKeys[name];
      }
      const keys = Object.keys(this.factory);
      for (let i = 0; i < keys.length; i += 1) {
        if (compareWildcars(name, keys[i])) {
          this.cache.bestKeys[name] = keys[i];
          return keys[i];
        }
      }
      this.cache.bestKeys[name] = null;
      return void 0;
    }
    get(name, settings) {
      let item = this.factory[name];
      if (!item) {
        if (this.parent) {
          return this.parent.get(name, settings);
        }
        const key = this.getBestKey(name);
        if (key) {
          item = this.factory[key];
        }
        if (!item) {
          return void 0;
        }
      }
      if (item.isSingleton) {
        if (item.instance && item.instance.applySettings) {
          item.instance.applySettings(item.instance.settings, settings);
        }
        return item.instance;
      }
      const Clazz = item.instance;
      return new Clazz(settings, this);
    }
    buildLiteral(subtype, step, value, context2) {
      return {
        type: "literal",
        subtype,
        src: step,
        value,
        context: context2,
        container: this
      };
    }
    resolvePathWithType(step, context2, input, srcObject) {
      const tokens = step.split(".");
      let token = tokens[0].trim();
      if (!token) {
        token = step.startsWith(".") ? "this" : "context";
      }
      const isnum = /^\d+$/.test(token);
      if (isnum) {
        return this.buildLiteral("number", step, parseFloat(token), context2);
      }
      if (token.startsWith('"')) {
        return this.buildLiteral(
          "string",
          step,
          token.replace(/^"(.+(?="$))"$/, "$1"),
          context2
        );
      }
      if (token.startsWith("'")) {
        return this.buildLiteral(
          "string",
          step,
          token.replace(/^'(.+(?='$))'$/, "$1"),
          context2
        );
      }
      if (token === "true") {
        return this.buildLiteral("boolean", step, true, context2);
      }
      if (token === "false") {
        return this.buildLiteral("boolean", step, false, context2);
      }
      let currentObject = context2;
      if (token === "input" || token === "output") {
        currentObject = input;
      } else if (token && token !== "context" && token !== "this") {
        currentObject = this.get(token) || currentObject[token];
      } else if (token === "this") {
        currentObject = srcObject;
      }
      for (let i = 1; i < tokens.length; i += 1) {
        const currentToken = tokens[i];
        if (!currentObject || !currentObject[currentToken]) {
          if (i < tokens.length - 1) {
            throw Error(`Path not found in pipeline "${step}"`);
          }
        }
        const prevCurrentObject = currentObject;
        currentObject = currentObject[currentToken];
        if (typeof currentObject === "function") {
          currentObject = currentObject.bind(prevCurrentObject);
        }
      }
      if (typeof currentObject === "function") {
        return {
          type: "function",
          src: step,
          value: currentObject,
          context: context2,
          container: this
        };
      }
      return {
        type: "reference",
        src: step,
        value: currentObject,
        context: context2,
        container: this
      };
    }
    resolvePath(step, context2, input, srcObject) {
      const result = this.resolvePathWithType(step, context2, input, srcObject);
      return result ? result.value : result;
    }
    setValue(path, valuePath, context2, input, srcObject) {
      const value = this.resolvePath(valuePath, context2, input, srcObject);
      const tokens = path.split(".");
      const newPath = tokens.slice(0, -1).join(".");
      const currentObject = this.resolvePath(newPath, context2, input, srcObject);
      currentObject[tokens[tokens.length - 1]] = value;
    }
    incValue(path, valuePath, context2, input, srcObject) {
      const value = this.resolvePath(valuePath, context2, input, srcObject);
      const tokens = path.split(".");
      if (path.startsWith(".")) {
        tokens.push("this");
      }
      const newPath = tokens.slice(0, -1).join(".");
      const currentObject = this.resolvePath(newPath, context2, input, srcObject);
      currentObject[tokens[tokens.length - 1]] += value;
    }
    decValue(path, valuePath, context2, input, srcObject) {
      const value = this.resolvePath(valuePath, context2, input, srcObject);
      const tokens = path.split(".");
      const newPath = tokens.slice(0, -1).join(".");
      const currentObject = this.resolvePath(newPath, context2, input, srcObject);
      currentObject[tokens[tokens.length - 1]] -= value;
    }
    eqValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA === valueB;
    }
    neqValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA !== valueB;
    }
    gtValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA > valueB;
    }
    geValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA >= valueB;
    }
    ltValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA < valueB;
    }
    leValue(pathA, pathB, srcContext, input, srcObject) {
      const context2 = srcContext;
      const valueA = this.resolvePath(pathA, context2, input, srcObject);
      const valueB = this.resolvePath(pathB, context2, input, srcObject);
      context2.floating = valueA <= valueB;
    }
    deleteValue(path, context2, input, srcObject) {
      const tokens = path.split(".");
      const newPath = tokens.slice(0, -1).join(".");
      const currentObject = this.resolvePath(newPath, context2, input, srcObject);
      delete currentObject[tokens[tokens.length - 1]];
    }
    getValue(srcPath, context2, input, srcObject) {
      const path = srcPath || "floating";
      const tokens = path.split(".");
      const newPath = tokens.slice(0, -1).join(".");
      const currentObject = this.resolvePath(newPath, context2, input, srcObject);
      return currentObject[tokens[tokens.length - 1]];
    }
    async runPipeline(srcPipeline, input, srcObject, depth = 0) {
      if (depth > 10) {
        throw new Error(
          "Pipeline depth is too high: perhaps you are using recursive pipelines?"
        );
      }
      const pipeline = typeof srcPipeline === "string" ? this.getPipeline(srcPipeline) : srcPipeline;
      if (!pipeline) {
        throw new Error(`Pipeline not found ${srcPipeline}`);
      }
      if (!pipeline.compiler) {
        const tag = JSON.stringify(pipeline);
        this.registerPipeline(tag, pipeline, false);
        const built = this.getPipeline(tag);
        return built.compiler.execute(built.compiled, input, srcObject, depth);
      }
      return pipeline.compiler.execute(
        pipeline.compiled,
        input,
        srcObject,
        depth
      );
    }
    use(item, name, isSingleton, onlyIfNotExists = false) {
      let instance;
      if (typeof item === "function") {
        if (item.name.endsWith("Compiler")) {
          this.registerCompiler(item);
          return item.name;
        }
        const Clazz = item;
        instance = new Clazz({ container: this });
      } else {
        instance = item;
      }
      if (instance.register) {
        instance.register(this);
      }
      const tag = instance.settings ? instance.settings.tag : void 0;
      const itemName = name || instance.name || tag || item.name || instance.constructor.name;
      if (!onlyIfNotExists || !this.get(itemName)) {
        this.register(itemName, instance, isSingleton);
      }
      return itemName;
    }
    getCompiler(name) {
      const compiler = this.compilers[name];
      if (compiler) {
        return compiler;
      }
      if (this.parent) {
        return this.parent.getCompiler(name);
      }
      return this.compilers.default;
    }
    buildPipeline(srcPipeline, prevPipeline = []) {
      const pipeline = [];
      if (srcPipeline && srcPipeline.length > 0) {
        for (let i = 0; i < srcPipeline.length; i += 1) {
          const line = srcPipeline[i];
          if (line.trim() === "$super") {
            for (let j = 0; j < prevPipeline.length; j += 1) {
              const s = prevPipeline[j].trim();
              if (!s.startsWith("->")) {
                pipeline.push(prevPipeline[j]);
              }
            }
          } else {
            pipeline.push(line);
          }
        }
      }
      const compilerName = !pipeline.length || !pipeline[0].startsWith("// compiler=") ? "default" : pipeline[0].slice(12);
      const compiler = this.getCompiler(compilerName);
      const compiled = compiler.compile(pipeline);
      return {
        pipeline,
        compiler,
        compiled
      };
    }
    registerPipeline(tag, pipeline, overwrite = true) {
      if (overwrite || !this.pipelines[tag]) {
        this.cache.pipelines = {};
        const prev = this.getPipeline(tag);
        this.pipelines[tag] = this.buildPipeline(
          pipeline,
          prev ? prev.pipeline : []
        );
      }
    }
    registerPipelineForChilds(childName, tag, pipeline, overwrite = true) {
      if (!this.childPipelines) {
        this.childPipelines = {};
      }
      if (!this.childPipelines[childName]) {
        this.childPipelines[childName] = [];
      }
      this.childPipelines[childName].push({ tag, pipeline, overwrite });
    }
    getPipeline(tag) {
      if (this.pipelines[tag]) {
        return this.pipelines[tag];
      }
      if (this.cache.pipelines[tag] !== void 0) {
        return this.cache.pipelines[tag] || void 0;
      }
      const keys = Object.keys(this.pipelines);
      for (let i = 0; i < keys.length; i += 1) {
        if (compareWildcars(tag, keys[i])) {
          this.cache.pipelines[tag] = this.pipelines[keys[i]];
          return this.pipelines[keys[i]];
        }
      }
      this.cache.pipelines[tag] = null;
      return void 0;
    }
    registerConfiguration(tag, configuration, overwrite = true) {
      if (overwrite || !this.configurations[tag]) {
        this.configurations[tag] = configuration;
      }
    }
    getConfiguration(tag) {
      if (this.configurations[tag]) {
        return this.configurations[tag];
      }
      const keys = Object.keys(this.configurations);
      for (let i = 0; i < keys.length; i += 1) {
        if (compareWildcars(tag, keys[i])) {
          return this.configurations[keys[i]];
        }
      }
      return void 0;
    }
    loadPipelinesFromString(str = "") {
      const lines = str.split(/\n|\r|\r\n/);
      let currentName = "";
      let currentPipeline = [];
      let currentTitle = "";
      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (line !== "") {
          if (line.startsWith("# ")) {
            if (currentName) {
              if (currentTitle && !["default", "pipelines"].includes(currentTitle.toLowerCase())) {
                this.registerPipelineForChilds(
                  currentTitle,
                  currentName,
                  currentPipeline
                );
              } else {
                this.registerPipeline(currentName, currentPipeline);
              }
            }
            currentTitle = line.slice(1).trim();
            currentName = "";
            currentPipeline = [];
          } else if (line.startsWith("## ")) {
            if (currentName) {
              if (currentTitle && !["default", "pipelines"].includes(currentTitle.toLowerCase())) {
                this.registerPipelineForChilds(
                  currentTitle,
                  currentName,
                  currentPipeline
                );
              } else {
                this.registerPipeline(currentName, currentPipeline);
              }
            }
            currentName = line.slice(2).trim();
            currentPipeline = [];
          } else if (currentName) {
            currentPipeline.push(line);
          }
        }
      }
      if (currentName) {
        if (currentTitle && !["default", "pipelines"].includes(currentTitle.toLowerCase())) {
          this.registerPipelineForChilds(
            currentTitle,
            currentName,
            currentPipeline
          );
        } else {
          this.registerPipeline(currentName, currentPipeline);
        }
      }
    }
    async start(pipelineName = "main") {
      const keys = Object.keys(this.factory);
      for (let i = 0; i < keys.length; i += 1) {
        const current = this.factory[keys[i]];
        if (current.isSingleton && current.instance && current.instance.start) {
          await current.instance.start();
        }
      }
      if (this.getPipeline(pipelineName)) {
        await this.runPipeline(pipelineName, {}, this);
      }
    }
  }
  const defaultContainer = new Container();
  container = {
    Container,
    defaultContainer
  };
  return container;
}
var arrToObj;
var hasRequiredArrToObj;
function requireArrToObj() {
  if (hasRequiredArrToObj) return arrToObj;
  hasRequiredArrToObj = 1;
  const { defaultContainer } = requireContainer();
  class ArrToObj {
    /**
     * Constructor of the class
     * @param {object} container Parent container, if not defined then the
     *    default container is used.
     */
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "arrToObj";
    }
    /**
     * Static method to convert an array to a hashmap object.
     * @param {object[]} arr Input array.
     * @returns {object} Output object.
     */
    static arrToObj(arr) {
      const result = {};
      for (let i = 0; i < arr.length; i += 1) {
        result[arr[i]] = 1;
      }
      return result;
    }
    run(input) {
      if (Array.isArray(input)) {
        return ArrToObj.arrToObj(input);
      }
      input.tokens = ArrToObj.arrToObj(input.tokens);
      return input;
    }
  }
  arrToObj = ArrToObj;
  return arrToObj;
}
var normalizer;
var hasRequiredNormalizer;
function requireNormalizer() {
  if (hasRequiredNormalizer) return normalizer;
  hasRequiredNormalizer = 1;
  const { defaultContainer } = requireContainer();
  class Normalizer {
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "normalize";
    }
    normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      const normalizer2 = this.container.get(`normalizer-${locale}`) || this;
      input.text = normalizer2.normalize(input.text, input);
      return input;
    }
  }
  normalizer = Normalizer;
  return normalizer;
}
var tokenizer;
var hasRequiredTokenizer;
function requireTokenizer() {
  if (hasRequiredTokenizer) return tokenizer;
  hasRequiredTokenizer = 1;
  const { defaultContainer } = requireContainer();
  const Normalizer = requireNormalizer();
  class Tokenizer {
    constructor(container2 = defaultContainer, shouldNormalize = false) {
      this.container = container2.container || container2;
      this.name = "tokenize";
      this.shouldNormalize = shouldNormalize;
    }
    getNormalizer() {
      if (!this.normalizer) {
        this.normalizer = this.container.get(`normalizer-${this.name.slice(-2)}`) || new Normalizer();
      }
      return this.normalizer;
    }
    normalize(text, force) {
      if (force === void 0 && this.shouldNormalize || force === true) {
        const normalizer2 = this.getNormalizer();
        return normalizer2.normalize(text);
      }
      return text;
    }
    innerTokenize(text) {
      return text.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
    }
    tokenize(text, normalize) {
      let result;
      if (this.cache) {
        const now = /* @__PURE__ */ new Date();
        const diff = Math.abs(now.getTime() - this.cache.created) / 36e5;
        if (diff > 1) {
          this.cache = void 0;
        }
      }
      if (!this.cache) {
        this.cache = {
          created: (/* @__PURE__ */ new Date()).getTime(),
          normalized: {},
          nonNormalized: {}
        };
      } else {
        if (normalize) {
          if (Object.prototype.hasOwnProperty.call(this.cache.normalized, text)) {
            result = this.cache.normalized[text];
          }
        } else if (Object.prototype.hasOwnProperty.call(this.cache.nonNormalized, text)) {
          result = this.cache.nonNormalized[text];
        }
        if (result) {
          return result;
        }
      }
      result = this.innerTokenize(this.normalize(text, normalize), normalize);
      if (normalize) {
        this.cache.normalized[text] = result;
      } else {
        this.cache.nonNormalized[text] = result;
      }
      return result;
    }
    async run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      let tokenizer2 = this.container.get(`tokenizer-${locale}`);
      if (!tokenizer2) {
        const tokenizerBert = this.container.get(`tokenizer-bert`);
        if (tokenizerBert && tokenizerBert.activeFor(locale)) {
          tokenizer2 = tokenizerBert;
        } else {
          tokenizer2 = this;
        }
      }
      const tokens = await tokenizer2.tokenize(input.text, input);
      input.tokens = tokens.filter((x) => x);
      return input;
    }
  }
  tokenizer = Tokenizer;
  return tokenizer;
}
var baseStemmer;
var hasRequiredBaseStemmer;
function requireBaseStemmer() {
  if (hasRequiredBaseStemmer) return baseStemmer;
  hasRequiredBaseStemmer = 1;
  const { defaultContainer } = requireContainer();
  const Tokenizer = requireTokenizer();
  class BaseStemmer {
    constructor(container2 = defaultContainer, dictionary) {
      this.container = container2.container || container2;
      this.cache = {};
      this.setCurrent("");
      this.dictionary = dictionary || { before: {}, after: {} };
    }
    setCurrent(value) {
      this.current = value;
      this.cursor = 0;
      this.limit = this.current.length;
      this.limit_backward = 0;
      this.bra = this.cursor;
      this.ket = this.limit;
    }
    getCurrent() {
      return this.current;
    }
    bc(s, ch) {
      if ((s[ch >>> 3] & 1 << (ch & 7)) == 0) {
        return true;
      }
      return false;
    }
    in_grouping(s, min, max) {
      if (this.cursor >= this.limit) return false;
      let ch = this.current.charCodeAt(this.cursor);
      if (ch > max || ch < min) return false;
      ch -= min;
      if (this.bc(s, ch)) return false;
      this.cursor++;
      return true;
    }
    in_grouping_b(s, min, max) {
      if (this.cursor <= this.limit_backward) return false;
      let ch = this.current.charCodeAt(this.cursor - 1);
      if (ch > max || ch < min) return false;
      ch -= min;
      if (this.bc(s, ch)) return false;
      this.cursor--;
      return true;
    }
    out_grouping(s, min, max) {
      if (this.cursor >= this.limit) return false;
      let ch = this.current.charCodeAt(this.cursor);
      if (ch > max || ch < min) {
        this.cursor++;
        return true;
      }
      ch -= min;
      if (this.bc(s, ch)) {
        this.cursor++;
        return true;
      }
      return false;
    }
    out_grouping_b(s, min, max) {
      if (this.cursor <= this.limit_backward) return false;
      let ch = this.current.charCodeAt(this.cursor - 1);
      if (ch > max || ch < min) {
        this.cursor--;
        return true;
      }
      ch -= min;
      if (this.bc(s, ch)) {
        this.cursor--;
        return true;
      }
      return false;
    }
    eq_s(s_size, s) {
      if (typeof s_size === "string") {
        s = s_size;
        s_size = s.length;
      }
      if (this.limit - this.cursor < s_size || this.current.slice(this.cursor, this.cursor + s_size) != s) {
        return false;
      }
      this.cursor += s_size;
      return true;
    }
    eq_s_b(s_size, s) {
      if (typeof s_size === "string") {
        s = s_size;
        s_size = s.length;
      }
      if (this.cursor - this.limit_backward < s_size || this.current.slice(this.cursor - s_size, this.cursor) != s) {
        return false;
      }
      this.cursor -= s_size;
      return true;
    }
    find_among(v, v_size) {
      let i = 0;
      let j = v_size || v.length;
      const c = this.cursor;
      const l = this.limit;
      let common_i = 0;
      let common_j = 0;
      let first_key_inspected = false;
      while (true) {
        const k = i + (j - i >>> 1);
        let diff = 0;
        let common = common_i < common_j ? common_i : common_j;
        var w = v[k];
        var i2;
        for (i2 = common; i2 < w.s_size; i2++) {
          if (c + common == l) {
            diff = -1;
            break;
          }
          diff = this.current.charCodeAt(c + common) - w.s.charCodeAt(i2);
          if (diff != 0) break;
          common++;
        }
        if (diff < 0) {
          j = k;
          common_j = common;
        } else {
          i = k;
          common_i = common;
        }
        if (j - i <= 1) {
          if (i > 0) break;
          if (j == i) break;
          if (first_key_inspected) break;
          first_key_inspected = true;
        }
      }
      while (true) {
        var w = v[i];
        if (common_i >= w.s_size) {
          this.cursor = c + w.s_size;
          if (w.method == null) {
            return w.result;
          }
          const res = w.method(w.instance);
          this.cursor = c + w.s_size;
          if (res) {
            return w.result;
          }
        }
        i = w.substring_i;
        if (i < 0) return 0;
      }
      return -1;
    }
    // find_among_b is for backwards processing. Same comments apply
    find_among_b(v, v_size) {
      let i = 0;
      let j = v_size || v.length;
      const c = this.cursor;
      const lb = this.limit_backward;
      let common_i = 0;
      let common_j = 0;
      let first_key_inspected = false;
      while (true) {
        const k = i + (j - i >> 1);
        let diff = 0;
        let common = common_i < common_j ? common_i : common_j;
        var w = v[k];
        var i2;
        for (i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
          if (c - common == lb) {
            diff = -1;
            break;
          }
          diff = this.current.charCodeAt(c - 1 - common) - w.s.charCodeAt(i2);
          if (diff != 0) break;
          common++;
        }
        if (diff < 0) {
          j = k;
          common_j = common;
        } else {
          i = k;
          common_i = common;
        }
        if (j - i <= 1) {
          if (i > 0) break;
          if (j == i) break;
          if (first_key_inspected) break;
          first_key_inspected = true;
        }
      }
      while (true) {
        var w = v[i];
        if (common_i >= w.s_size) {
          this.cursor = c - w.s_size;
          if (w.method == null) return w.result;
          const res = w.method(this);
          this.cursor = c - w.s_size;
          if (res) return w.result;
        }
        i = w.substring_i;
        if (i < 0) return 0;
      }
      return -1;
    }
    /* to replace chars between c_bra and c_ket in this.current by the
     * chars in s.
     */
    replace_s(c_bra, c_ket, s) {
      const adjustment = s.length - (c_ket - c_bra);
      this.current = this.current.slice(0, c_bra) + s + this.current.slice(c_ket);
      this.limit += adjustment;
      if (this.cursor >= c_ket) this.cursor += adjustment;
      else if (this.cursor > c_bra) this.cursor = c_bra;
      return adjustment;
    }
    slice_check() {
      if (this.bra < 0 || this.bra > this.ket || this.ket > this.limit || this.limit > this.current.length) {
        return false;
      }
      return true;
    }
    slice_from(s) {
      if (this.slice_check()) {
        this.replace_s(this.bra, this.ket, s);
        return true;
      }
      return false;
    }
    slice_del() {
      return this.slice_from("");
    }
    insert(c_bra, c_ket, s) {
      const adjustment = this.replace_s(c_bra, c_ket, s);
      if (c_bra <= this.bra) this.bra += adjustment;
      if (c_bra <= this.ket) this.ket += adjustment;
    }
    /* Copy the slice into the supplied StringBuffer */
    slice_to(s) {
      let result = "";
      if (this.slice_check()) {
        result = this.current.slice(this.bra, this.ket);
      }
      return result;
    }
    stemWord(word) {
      let result = this.cache[`.${word}`];
      if (result == null) {
        if (this.dictionary.before.hasOwnProperty(word)) {
          result = this.dictionary.before[word];
        } else {
          this.setCurrent(word);
          this.innerStem();
          result = this.getCurrent();
          if (this.dictionary.after.hasOwnProperty(result)) {
            result = this.dictionary.after[result];
          }
        }
        this.cache[`.${word}`] = result;
      }
      return result;
    }
    stemWords(words) {
      const results = [];
      for (let i = 0; i < words.length; i++) {
        const stemmed = this.stemWord(words[i]);
        if (stemmed) {
          results.push(stemmed.trim());
        }
      }
      return results;
    }
    stem(tokens) {
      if (tokens === void 0 || tokens === null) {
        return tokens;
      }
      if (!Array.isArray(tokens)) {
        return this.stemWords([tokens])[0];
      }
      return this.stemWords(tokens);
    }
    getTokenizer() {
      if (!this.tokenizer) {
        this.tokenizer = this.container.get(`tokenizer-${this.name.slice(-2)}`) || new Tokenizer();
      }
      return this.tokenizer;
    }
    getStopwords() {
      if (!this.stopwords) {
        this.stopwords = this.container.get(`tokenizer-${this.name.slice(-2)}`);
      }
      return this.stopwords;
    }
    tokenizeAndStem(text, keepStops = true) {
      const tokenizer2 = this.getTokenizer();
      let tokens = tokenizer2.tokenize(text, true);
      if (!keepStops) {
        const stopwords2 = this.getStopwords();
        if (stopwords2) {
          tokens = stopwords2.removeStopwords(tokens);
        }
      }
      return this.stemWords(tokens);
    }
  }
  baseStemmer = BaseStemmer;
  return baseStemmer;
}
var objToArr;
var hasRequiredObjToArr;
function requireObjToArr() {
  if (hasRequiredObjToArr) return objToArr;
  hasRequiredObjToArr = 1;
  const { defaultContainer } = requireContainer();
  class ObjToArr {
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "objToArr";
    }
    static objToArr(obj) {
      return Object.keys(obj);
    }
    run(input) {
      if (!input.tokens) {
        return ObjToArr.objToArr(input);
      }
      input.tokens = ObjToArr.objToArr(input.tokens);
      return input;
    }
  }
  objToArr = ObjToArr;
  return objToArr;
}
var stemmer;
var hasRequiredStemmer;
function requireStemmer() {
  if (hasRequiredStemmer) return stemmer;
  hasRequiredStemmer = 1;
  const { defaultContainer } = requireContainer();
  class Stemmer {
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "stem";
    }
    stem(tokens) {
      return tokens;
    }
    getStemmer(srcInput) {
      const input = srcInput;
      const locale = input.locale || (input.settings ? input.settings.locale || "en" : "en");
      let stemmer2 = this.container.get(`stemmer-${locale}`);
      if (!stemmer2) {
        const stemmerBert = this.container.get(`stemmer-bert`);
        if (stemmerBert && stemmerBert.activeFor(locale)) {
          stemmer2 = stemmerBert;
        } else {
          stemmer2 = this;
        }
      }
      return stemmer2;
    }
    async addForTraining(srcInput) {
      const stemmer2 = this.getStemmer(srcInput);
      if (stemmer2.addUtterance) {
        await stemmer2.addUtterance(srcInput.utterance, srcInput.intent);
      }
      return srcInput;
    }
    async train(srcInput) {
      const stemmer2 = this.getStemmer(srcInput);
      if (stemmer2.innerTrain) {
        await stemmer2.innerTrain();
      }
      return srcInput;
    }
    async run(srcInput) {
      const input = srcInput;
      const stemmer2 = this.getStemmer(input);
      input.tokens = await stemmer2.stem(input.tokens, input);
      return input;
    }
  }
  stemmer = Stemmer;
  return stemmer;
}
var stopwords;
var hasRequiredStopwords;
function requireStopwords() {
  if (hasRequiredStopwords) return stopwords;
  hasRequiredStopwords = 1;
  const { defaultContainer } = requireContainer();
  class Stopwords {
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "removeStopwords";
      this.dictionary = {};
    }
    build(list) {
      for (let i = 0; i < list.length; i += 1) {
        this.dictionary[list[i]] = true;
      }
    }
    isNotStopword(token) {
      return !this.dictionary[token];
    }
    isStopword(token) {
      return !!this.dictionary[token];
    }
    removeStopwords(tokens) {
      return tokens.filter((x) => this.isNotStopword(x));
    }
    run(srcInput) {
      if (srcInput.settings && srcInput.settings.keepStopwords === false) {
        const input = srcInput;
        const locale = input.locale || "en";
        const remover = this.container.get(`stopwords-${locale}`) || this;
        input.tokens = remover.removeStopwords(input.tokens, input).filter((x) => x);
        return input;
      }
      return srcInput;
    }
  }
  stopwords = Stopwords;
  return stopwords;
}
var timer;
var hasRequiredTimer;
function requireTimer() {
  if (hasRequiredTimer) return timer;
  hasRequiredTimer = 1;
  const { defaultContainer } = requireContainer();
  class Timer {
    /**
     * Constructor of the class
     * @param {object} container Parent container
     */
    constructor(container2 = defaultContainer) {
      this.container = container2.container || container2;
      this.name = "timer";
    }
    /**
     * Starts the timer
     * @param {object} input
     */
    start(input) {
      if (input) {
        input.hrstart = /* @__PURE__ */ new Date();
      }
      return input;
    }
    /**
     * Stops the timer
     * @param {object} srcInput
     */
    stop(srcInput) {
      const input = srcInput;
      if (input && input.hrstart) {
        const hrend = /* @__PURE__ */ new Date();
        input.elapsed = hrend.getTime() - input.hrstart.getTime();
        delete input.hrstart;
      }
      return input;
    }
    run(srcInput) {
      this.start(srcInput);
    }
  }
  timer = Timer;
  return timer;
}
var clonable;
var hasRequiredClonable;
function requireClonable() {
  if (hasRequiredClonable) return clonable;
  hasRequiredClonable = 1;
  const { defaultContainer } = requireContainer();
  class Clonable {
    /**
     * Constructor of the class
     * @param {object} settings
     */
    constructor(settings = {}, container2 = defaultContainer) {
      this.container = settings.container || container2;
      this.applySettings(this, settings);
    }
    get logger() {
      return this.container.get("logger");
    }
    /**
     * Apply default settings to an object.
     * @param {object} obj Target object.
     * @param {object} settings Input settings.
     */
    applySettings(srcobj, settings = {}) {
      const obj = srcobj || {};
      Object.keys(settings).forEach((key) => {
        if (obj[key] === void 0) {
          obj[key] = settings[key];
        }
      });
      return obj;
    }
    toJSON() {
      const settings = this.jsonExport || {};
      const result = {};
      const keys = Object.keys(this);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (key !== "jsonExport" && key !== "jsonImport" && key !== "container" && !key.startsWith("pipeline")) {
          const fn = settings[key] === void 0 ? true : settings[key];
          if (typeof fn === "function") {
            const value = fn.bind(this)(result, this, key, this[key]);
            if (value) {
              result[key] = value;
            }
          } else if (typeof fn === "boolean") {
            if (fn) {
              result[key] = this[key];
              if (key === "settings") {
                delete result[key].container;
              }
            }
          } else if (typeof fn === "string") {
            result[fn] = this[key];
          }
        }
      }
      return result;
    }
    fromJSON(json) {
      const settings = this.jsonImport || {};
      const keys = Object.keys(json);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const fn = settings[key] === void 0 ? true : settings[key];
        if (typeof fn === "function") {
          const value = fn.bind(this)(this, json, key, json[key]);
          if (value) {
            this[key] = value;
          }
        } else if (typeof fn === "boolean") {
          if (fn) {
            this[key] = json[key];
          }
        } else if (typeof fn === "string") {
          this[fn] = json[key];
        }
      }
    }
    objToValues(obj, srcKeys) {
      const keys = srcKeys || Object.keys(obj);
      const result = [];
      for (let i = 0; i < keys.length; i += 1) {
        result.push(obj[keys[i]]);
      }
      return result;
    }
    valuesToObj(values, keys) {
      const result = {};
      for (let i = 0; i < values.length; i += 1) {
        result[keys[i]] = values[i];
      }
      return result;
    }
    getPipeline(tag) {
      return this.container.getPipeline(tag);
    }
    async runPipeline(input, pipeline) {
      return this.container.runPipeline(pipeline || this.pipeline, input, this);
    }
    use(item) {
      this.container.use(item);
    }
  }
  clonable = Clonable;
  return clonable;
}
var memoryStorage;
var hasRequiredMemoryStorage;
function requireMemoryStorage() {
  if (hasRequiredMemoryStorage) return memoryStorage;
  hasRequiredMemoryStorage = 1;
  const { defaultContainer } = requireContainer();
  const Clonable = requireClonable();
  class MemoryStorage extends Clonable {
    constructor(settings = {}, container2 = void 0) {
      super(
        {
          settings: {},
          container: settings.container || container2 || defaultContainer
        },
        container2
      );
      this.applySettings(this.settings, settings);
      this.applySettings(this.settings, { etag: 1, memory: {} });
      if (!this.settings.tag) {
        this.settings.tag = "storage";
      }
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
    }
    read(keys) {
      return new Promise((resolve) => {
        const data = {};
        if (!Array.isArray(keys)) {
          keys = [keys];
        }
        keys.forEach((key) => {
          const item = this.settings.memory[key];
          if (item) {
            data[key] = JSON.parse(item);
          }
        });
        resolve(data);
      });
    }
    saveItem(key, item) {
      const clone = { ...item };
      clone.eTag = this.settings.etag.toString();
      this.settings.etag += 1;
      this.settings.memory[key] = JSON.stringify(clone);
      return clone;
    }
    write(changes) {
      return new Promise((resolve, reject) => {
        Object.keys(changes).forEach((key) => {
          const newItem = changes[key];
          const oldStr = this.settings.memory[key];
          if (!oldStr || newItem.eTag === "*") {
            return resolve(this.saveItem(key, newItem));
          }
          const oldItem = JSON.parse(oldStr);
          if (newItem.eTag !== oldItem.eTag) {
            return reject(
              new Error(`Error writing "${key}" due to eTag conflict.`)
            );
          }
          return resolve(this.saveItem(key, newItem));
        });
      });
    }
    delete(keys) {
      return new Promise((resolve) => {
        keys.forEach((key) => delete this.settings.memory[key]);
        resolve();
      });
    }
  }
  memoryStorage = MemoryStorage;
  return memoryStorage;
}
var mockFs;
var hasRequiredMockFs;
function requireMockFs() {
  if (hasRequiredMockFs) return mockFs;
  hasRequiredMockFs = 1;
  function readFile() {
    return new Promise((resolve) => {
      resolve(void 0);
    });
  }
  function writeFile() {
    return new Promise((resolve, reject) => {
      reject(new Error("File cannot be written in web"));
    });
  }
  function existsSync() {
    return false;
  }
  function lstatSync() {
    return void 0;
  }
  function readFileSync() {
    return void 0;
  }
  mockFs = {
    readFile,
    writeFile,
    existsSync,
    lstatSync,
    readFileSync,
    name: "fs"
  };
  return mockFs;
}
var containerBootstrap_1;
var hasRequiredContainerBootstrap;
function requireContainerBootstrap() {
  if (hasRequiredContainerBootstrap) return containerBootstrap_1;
  hasRequiredContainerBootstrap = 1;
  var define_process_env_default = {};
  const ArrToObj = requireArrToObj();
  const { Container } = requireContainer();
  const Normalizer = requireNormalizer();
  const ObjToArr = requireObjToArr();
  const { loadEnvFromJson } = requireHelper();
  const Stemmer = requireStemmer();
  const Stopwords = requireStopwords();
  const Tokenizer = requireTokenizer();
  const Timer = requireTimer();
  const logger = requireLogger();
  const MemoryStorage = requireMemoryStorage();
  const fs = requireMockFs();
  function loadPipelinesStr(instance, pipelines) {
    instance.loadPipelinesFromString(pipelines);
  }
  function traverse(obj, preffix) {
    if (typeof obj === "string") {
      if (obj.startsWith("$")) {
        return define_process_env_default[`${preffix}${obj.slice(1)}`] || define_process_env_default[obj.slice(1)];
      }
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((x) => traverse(x, preffix));
    }
    if (typeof obj === "object") {
      const keys = Object.keys(obj);
      const result = {};
      for (let i = 0; i < keys.length; i += 1) {
        result[keys[i]] = traverse(obj[keys[i]], preffix);
      }
      return result;
    }
    return obj;
  }
  function containerBootstrap(inputSettings, mustLoadEnv, container2, preffix, pipelines, parent) {
    const srcSettings = inputSettings || {};
    const instance = container2 || new Container(preffix);
    instance.parent = parent;
    if (!preffix) {
      instance.register("fs", fs);
      instance.use(ArrToObj);
      instance.use(Normalizer);
      instance.use(ObjToArr);
      instance.use(Stemmer);
      instance.use(Stopwords);
      instance.use(Tokenizer);
      instance.use(Timer);
      instance.use(logger);
      instance.use(MemoryStorage);
    }
    const settings = srcSettings;
    if (srcSettings.env) {
      loadEnvFromJson(preffix, srcSettings.env);
    }
    let configuration;
    configuration = settings;
    configuration = traverse(configuration, preffix ? `${preffix}_` : "");
    if (configuration.settings) {
      const keys = Object.keys(configuration.settings);
      for (let i = 0; i < keys.length; i += 1) {
        instance.registerConfiguration(
          keys[i],
          configuration.settings[keys[i]],
          true
        );
      }
    }
    if (configuration.use) {
      for (let i = 0; i < configuration.use.length; i += 1) {
        const item = configuration.use[i];
        if (Array.isArray(item)) {
          instance.register(item[0], item[1]);
        } else {
          instance.use(item);
        }
      }
    }
    if (configuration.terraform) {
      for (let i = 0; i < configuration.terraform.length; i += 1) {
        const current = configuration.terraform[i];
        const terra = instance.get(current.className);
        instance.register(current.name, terra, true);
      }
    }
    if (configuration.childs) {
      instance.childs = configuration.childs;
    }
    if (pipelines) {
      for (let i = 0; i < pipelines.length; i += 1) {
        const pipeline = pipelines[i];
        instance.registerPipeline(
          pipeline.tag,
          pipeline.pipeline,
          pipeline.overwrite
        );
      }
    }
    if (configuration.pipelines) {
      loadPipelinesStr(instance, configuration.pipelines);
    }
    return instance;
  }
  containerBootstrap_1 = containerBootstrap;
  return containerBootstrap_1;
}
var uuid_1;
var hasRequiredUuid;
function requireUuid() {
  if (hasRequiredUuid) return uuid_1;
  hasRequiredUuid = 1;
  function uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
  uuid_1 = uuid;
  return uuid_1;
}
var dock_1;
var hasRequiredDock;
function requireDock() {
  if (hasRequiredDock) return dock_1;
  hasRequiredDock = 1;
  const containerBootstrap = requireContainerBootstrap();
  class Dock {
    constructor() {
      this.containers = {};
    }
    getContainer(name) {
      return this.containers[name || "default"];
    }
    async createContainer(name, settings, srcMustLoadEnv, preffix, parent, pipelines) {
      const mustLoadEnv = srcMustLoadEnv === void 0 ? true : srcMustLoadEnv;
      if (typeof name !== "string") {
        settings = name;
        name = "";
      }
      if (!settings) {
        if (name === "default" || name === "") {
          settings = "conf.json";
        }
      }
      if (!this.containers[name]) {
        const container2 = containerBootstrap(
          settings,
          mustLoadEnv,
          void 0,
          preffix,
          pipelines
        );
        container2.name = name;
        this.containers[name] = container2;
        container2.dock = this;
        container2.parent = parent;
        await container2.start();
        if (container2.childs) {
          await this.buildChilds(container2);
        }
      }
      return this.containers[name];
    }
    async buildChilds(container2) {
      if (container2 && container2.childs) {
        const keys = Object.keys(container2.childs);
        const childs = {};
        for (let i = 0; i < keys.length; i += 1) {
          const settings = container2.childs[keys[i]];
          settings.isChild = true;
          if (!settings.pathPipeline) {
            settings.pathPipeline = `${keys[i]}_pipeline.md`;
          }
          childs[keys[i]] = await this.createContainer(
            keys[i],
            settings,
            false,
            keys[i],
            container2,
            container2.childPipelines ? container2.childPipelines[keys[i]] : void 0
          );
        }
        container2.childs = childs;
      }
    }
    async terraform(settings, mustLoadEnv = true) {
      const defaultContainer = await this.createContainer(
        "default",
        settings,
        mustLoadEnv,
        ""
      );
      return defaultContainer;
    }
    start(settings, mustLoadEnv = true) {
      return this.terraform(settings, mustLoadEnv);
    }
  }
  const dock = new Dock();
  dock_1 = dock;
  return dock_1;
}
var context;
var hasRequiredContext;
function requireContext() {
  if (hasRequiredContext) return context;
  hasRequiredContext = 1;
  const { defaultContainer } = requireContainer();
  const Clonable = requireClonable();
  class Context extends Clonable {
    constructor(settings = {}, container2 = void 0) {
      super(
        {
          settings: {},
          container: settings.container || container2 || defaultContainer
        },
        container2
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = "context";
      }
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
    }
    getStorage() {
      const storage = this.container.get(this.settings.storageName || "storage");
      if (!storage) {
        throw new Error("Storage not found");
      }
      return storage;
    }
    getContext(key) {
      const storage = this.getStorage();
      return storage.read(`${this.settings.tag}-${key}`);
    }
    setContext(key, value) {
      const storage = this.getStorage();
      const change = {
        [key]: value
      };
      return storage.write(change);
    }
    async getContextValue(key, valueName) {
      const context2 = await this.getContext(key);
      return context2 ? context2[valueName] : void 0;
    }
    async setContextValue(key, valueName, value) {
      let context2 = await this.getContext(key);
      if (!context2) {
        context2 = {};
      }
      context2[valueName] = value;
      return this.setContext(key, context2);
    }
  }
  context = Context;
  return context;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  const Among = requireAmong();
  const ArrToObj = requireArrToObj();
  const BaseStemmer = requireBaseStemmer();
  const containerBootstrap = requireContainerBootstrap();
  const Clonable = requireClonable();
  const { Container, defaultContainer } = requireContainer();
  const Normalizer = requireNormalizer();
  const ObjToArr = requireObjToArr();
  const Stemmer = requireStemmer();
  const Stopwords = requireStopwords();
  const Tokenizer = requireTokenizer();
  const Timer = requireTimer();
  const logger = requireLogger();
  const {
    hasUnicode,
    unicodeToArray,
    asciiToArray,
    stringToArray,
    compareWildcars,
    loadEnv
  } = requireHelper();
  const MemoryStorage = requireMemoryStorage();
  const uuid = requireUuid();
  const dock = requireDock();
  const Context = requireContext();
  async function dockStart(settings, mustLoadEnv) {
    await dock.start(settings, mustLoadEnv);
    return dock;
  }
  src = {
    Among,
    ArrToObj,
    BaseStemmer,
    containerBootstrap,
    Clonable,
    Container,
    defaultContainer,
    hasUnicode,
    unicodeToArray,
    asciiToArray,
    stringToArray,
    compareWildcars,
    loadEnv,
    Normalizer,
    ObjToArr,
    Stemmer,
    Stopwords,
    Tokenizer,
    Timer,
    logger,
    MemoryStorage,
    uuid,
    dock,
    Context,
    dockStart
  };
  return src;
}
export {
  requireSrc as r
};
