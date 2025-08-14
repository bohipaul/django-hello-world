import { r as requireSrc$9 } from "./index.GUmXO0j9.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var leven_1;
var hasRequiredLeven;
function requireLeven() {
  if (hasRequiredLeven) return leven_1;
  hasRequiredLeven = 1;
  const array = [];
  const charCodeCache = [];
  function leven(left, right) {
    if (left.length > right.length) {
      [left, right] = [right, left];
    }
    let leftLength = left.length - 1;
    let rightLength = right.length - 1;
    while (leftLength > 0 && left.charCodeAt(leftLength) === right.charCodeAt(rightLength)) {
      leftLength -= 1;
      rightLength -= 1;
    }
    leftLength += 1;
    rightLength += 1;
    let start = 0;
    while (start < leftLength && left.charCodeAt(start) === right.charCodeAt(start)) {
      start += 1;
    }
    leftLength -= start;
    rightLength -= start;
    if (leftLength === 0) {
      return rightLength;
    }
    for (let i = 0; i < leftLength; i += 1) {
      charCodeCache[i] = left.charCodeAt(start + i);
      array[i] = i + 1;
    }
    let bCharCode;
    let result;
    let temp;
    let temp2;
    let j = 0;
    while (j < rightLength) {
      bCharCode = right.charCodeAt(start + j);
      temp = j;
      j += 1;
      result = j;
      for (let i = 0; i < leftLength; i += 1) {
        temp2 = temp + (bCharCode !== charCodeCache[i]) | 0;
        temp = array[i];
        if (temp > result) {
          array[i] = temp2 > result ? result + 1 : temp2;
        } else {
          array[i] = temp2 > temp ? temp + 1 : temp2;
        }
        result = array[i];
      }
    }
    return result;
  }
  leven_1 = leven;
  return leven_1;
}
var similarity_1;
var hasRequiredSimilarity;
function requireSimilarity() {
  if (hasRequiredSimilarity) return similarity_1;
  hasRequiredSimilarity = 1;
  const leven = requireLeven();
  function similarity(str1, str2, normalize = false) {
    if (normalize) {
      str1 = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      str2 = str2.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    return str1 === str2 ? 0 : leven(str1, str2);
  }
  similarity_1 = similarity;
  return similarity_1;
}
var cosineSimilarity;
var hasRequiredCosineSimilarity;
function requireCosineSimilarity() {
  if (hasRequiredCosineSimilarity) return cosineSimilarity;
  hasRequiredCosineSimilarity = 1;
  class CosineSimilarity {
    constructor(container) {
      this.container = container;
    }
    getTokens(text, locale = "en") {
      if (typeof text === "string") {
        const tokenizer = this.container && this.container.get(`tokenizer-${locale}`);
        return tokenizer ? tokenizer.tokenize(text, true) : text.split(" ");
      }
      return text;
    }
    termFreqMap(str, locale) {
      const words = this.getTokens(str, locale);
      const termFreq = {};
      words.forEach((w) => {
        termFreq[w] = (termFreq[w] || 0) + 1;
      });
      return termFreq;
    }
    addKeysToDict(map, dict) {
      Object.keys(map).forEach((key) => {
        dict[key] = true;
      });
    }
    termFreqMapToVector(map, dict) {
      const termFreqVector = [];
      Object.keys(dict).forEach((term) => {
        termFreqVector.push(map[term] || 0);
      });
      return termFreqVector;
    }
    vecDotProduct(vecA, vecB) {
      let product = 0;
      for (let i = 0; i < vecA.length; i += 1) {
        product += vecA[i] * vecB[i];
      }
      return product;
    }
    vecMagnitude(vec) {
      let sum = 0;
      for (let i = 0; i < vec.length; i += 1) {
        sum += vec[i] * vec[i];
      }
      return Math.sqrt(sum);
    }
    /**
     * Calculates cosine-similarity from two vectors
     * @param {number[]} left Left vector
     * @param {number[]} right Right vector
     * @returns {number} cosine between two vectors
     * {@link https://en.wikipedia.org/wiki/Cosine_similarity Cosine Similarity}
     */
    cosineSimilarity(vecA, vecB) {
      return this.vecDotProduct(vecA, vecB) / (this.vecMagnitude(vecA) * this.vecMagnitude(vecB));
    }
    getTermFreqVectors(strA, strB, locale) {
      const termFreqA = this.termFreqMap(strA, locale);
      const termFreqB = this.termFreqMap(strB, locale);
      if (!Object.keys(termFreqA).length || !Object.keys(termFreqB).length) {
        return 0;
      }
      const dict = {};
      this.addKeysToDict(termFreqA, dict);
      this.addKeysToDict(termFreqB, dict);
      return [
        this.termFreqMapToVector(termFreqA, dict),
        this.termFreqMapToVector(termFreqB, dict)
      ];
    }
    /**
     * Calculates cosine-similarity from two sentences
     * @param {string} left Left string
     * @param {string} right Right string
     * @returns {number} cosine between two sentences representend in VSM
     */
    similarity(strA, strB, locale) {
      if (strA === strB) {
        return 1;
      }
      const [termFreqVecA, termFreqVecB] = this.getTermFreqVectors(
        strA,
        strB,
        locale
      );
      return this.cosineSimilarity(termFreqVecA, termFreqVecB);
    }
  }
  cosineSimilarity = CosineSimilarity;
  return cosineSimilarity;
}
var spellCheck;
var hasRequiredSpellCheck;
function requireSpellCheck() {
  if (hasRequiredSpellCheck) return spellCheck;
  hasRequiredSpellCheck = 1;
  const similarity = requireSimilarity();
  class SpellCheck {
    constructor(settings) {
      this.settings = settings || {};
      this.minLength = this.settings.minLength || 4;
      if (this.settings.features) {
        this.setFeatures(this.settings.features);
      } else {
        this.features = {};
        this.featuresByLength = {};
      }
    }
    setFeatures(features) {
      this.features = features;
      this.featuresByLength = {};
      this.featuresList = Object.keys(this.features);
      for (let i = 0; i < this.featuresList.length; i += 1) {
        const feature = this.featuresList[i];
        const { length } = feature;
        if (!this.featuresByLength[length]) {
          this.featuresByLength[length] = [];
        }
        this.featuresByLength[length].push(feature);
      }
    }
    checkToken(token, distance) {
      if (this.features[token]) {
        return token;
      }
      if (token.length < this.minLength) {
        return token;
      }
      let best;
      let distanceBest = Infinity;
      for (let i = token.length - distance - 1; i < token.length + distance; i += 1) {
        const currentFeatures = this.featuresByLength[i + 1];
        if (currentFeatures) {
          for (let j = 0; j < currentFeatures.length; j += 1) {
            const feature = currentFeatures[j];
            const similar = similarity(token, feature);
            if (similar <= distance) {
              if (similar < distanceBest) {
                best = feature;
                distanceBest = similar;
              } else if (similar === distanceBest && best) {
                const la = Math.abs(best.length - token.length);
                const lb = Math.abs(feature.length - token.length);
                if (la > lb || la === lb && this.features[feature] > this.features[best]) {
                  best = feature;
                  distanceBest = similar;
                }
              }
            }
          }
        }
      }
      return best || token;
    }
    check(tokens, distance = 1) {
      if (!Array.isArray(tokens)) {
        const keys = Object.keys(tokens);
        const processed = this.check(keys, distance);
        const obj = {};
        for (let i = 0; i < processed.length; i += 1) {
          obj[processed[i]] = tokens[keys[i]];
        }
        return obj;
      }
      const result = [];
      for (let i = 0; i < tokens.length; i += 1) {
        result.push(this.checkToken(tokens[i], distance));
      }
      return result;
    }
  }
  spellCheck = SpellCheck;
  return spellCheck;
}
var src$8;
var hasRequiredSrc$8;
function requireSrc$8() {
  if (hasRequiredSrc$8) return src$8;
  hasRequiredSrc$8 = 1;
  const leven = requireLeven();
  const similarity = requireSimilarity();
  const CosineSimilarity = requireCosineSimilarity();
  const SpellCheck = requireSpellCheck();
  src$8 = {
    leven,
    CosineSimilarity,
    similarity,
    SpellCheck
  };
  return src$8;
}
var nlu;
var hasRequiredNlu;
function requireNlu() {
  if (hasRequiredNlu) return nlu;
  hasRequiredNlu = 1;
  const { Clonable, compareWildcars } = requireSrc$9();
  const { SpellCheck } = requireSrc$8();
  class Nlu extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      this.applySettings(this.settings, { locale: "en" });
      if (!this.settings.tag) {
        this.settings.tag = `nlu-${this.settings.locale}`;
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.applySettings(this, {
        pipelinePrepare: this.getPipeline(`${this.settings.tag}-prepare`),
        pipelineTrain: this.getPipeline(`${this.settings.tag}-train`),
        pipelineProcess: this.getPipeline(`${this.settings.tag}-process`)
      });
      this.spellCheck = new SpellCheck(this.settings);
    }
    registerDefault() {
      this.container.registerConfiguration(
        "nlu-??",
        {
          keepStopwords: true,
          nonefeatureValue: 1,
          nonedeltaMultiplier: 1.2,
          spellCheck: false,
          spellCheckDistance: 1,
          filterZeros: true,
          log: true
        },
        false
      );
      this.container.registerPipeline(
        "nlu-??-train",
        [".prepareCorpus", ".addNoneFeature", ".innerTrain"],
        false
      );
    }
    async defaultPipelinePrepare(input) {
      let result;
      if (this.cache) {
        const now = /* @__PURE__ */ new Date();
        const diff = Math.abs(now.getTime() - this.cache.created) / 36e5;
        if (diff > 1) {
          this.cache.results = {};
          this.cache.created = (/* @__PURE__ */ new Date()).getTime();
        }
      }
      if (!this.cache) {
        this.cache = {
          created: (/* @__PURE__ */ new Date()).getTime(),
          results: {},
          normalize: this.container.get("normalize"),
          tokenize: this.container.get("tokenize"),
          removeStopwords: this.container.get("removeStopwords"),
          stem: this.container.get("stem"),
          arrToObj: this.container.get("arrToObj")
        };
      } else if (this.cache.results[input.settings.locale]) {
        result = this.cache.results[input.settings.locale][input.text || input.utterance];
        if (result) {
          return result;
        }
      }
      let output = input;
      output = this.cache.normalize.run(output);
      output = await this.cache.tokenize.run(output);
      output = this.cache.removeStopwords.run(output);
      output = await this.cache.stem.run(output);
      output = this.cache.arrToObj.run(output);
      result = output.tokens;
      if (!this.cache.results[input.settings.locale]) {
        this.cache.results[input.settings.locale] = {};
      }
      this.cache.results[input.settings.locale][input.text || input.utterance] = result;
      return result;
    }
    async defaultPipelineProcess(input) {
      let output = await this.prepare(input);
      output = await this.doSpellCheck(output);
      output = await this.textToFeatures(output);
      output = await this.innerProcess(output);
      output = await this.filterNonActivated(output);
      output = await this.normalizeClassifications(output);
      return output;
    }
    async prepare(text, srcSettings) {
      const settings = srcSettings || this.settings;
      if (typeof text === "string") {
        const input = {
          locale: this.settings.locale,
          text,
          settings
        };
        if (this.pipelinePrepare) {
          return this.runPipeline(input, this.pipelinePrepare);
        }
        return this.defaultPipelinePrepare(input);
      }
      if (typeof text === "object") {
        if (Array.isArray(text)) {
          const result = [];
          for (let i = 0; i < text.length; i += 1) {
            result.push(await this.prepare(text[i], settings));
          }
          return result;
        }
        let item = settings.fieldNameSrc ? text[settings.fieldNameSrc] : text.texts || text.utterances;
        if (!item && typeof item !== "string") {
          if (typeof text.text === "string") {
            item = text.text;
          } else if (typeof text.utterance === "string") {
            item = text.utterance;
          }
        }
        if (item || typeof item === "string") {
          const result = await this.prepare(item, settings);
          const targetField = settings.fieldNameTgt || "tokens";
          return { [targetField]: result, ...text };
        }
      }
      throw new Error(
        `Error at nlu.prepare: expected a text but received ${text}`
      );
    }
    async doSpellCheck(input, srcSettings) {
      const settings = this.applySettings(srcSettings || {}, this.settings);
      let shouldSpellCheck = input.settings.spellCheck === void 0 ? void 0 : input.settings.spellCheck;
      let spellCheckDistance = input.settings.spellCheckDistance === void 0 ? void 0 : input.settings.spellCheckDistance;
      if (shouldSpellCheck === void 0) {
        shouldSpellCheck = settings.spellCheck === void 0 ? void 0 : settings.spellCheck;
      }
      if (spellCheckDistance === void 0) {
        spellCheckDistance = settings.spellCheckDistance === void 0 ? 1 : settings.spellCheckDistance;
      }
      if (shouldSpellCheck) {
        const tokens = this.spellCheck.check(input.tokens, spellCheckDistance);
        input.tokens = tokens;
      }
      return input;
    }
    async prepareCorpus(srcInput) {
      this.features = {};
      this.intents = {};
      this.intentFeatures = {};
      const input = srcInput;
      const { corpus } = input;
      const result = [];
      for (let i = 0; i < corpus.length; i += 1) {
        const { intent } = corpus[i];
        const item = {
          input: await this.prepare(corpus[i].utterance, input.settings),
          output: { [intent]: 1 }
        };
        const keys2 = Object.keys(item.input);
        if (!Object.prototype.hasOwnProperty.call(this.intentFeatures, intent)) {
          this.intentFeatures[intent] = {};
        }
        for (let j = 0; j < keys2.length; j += 1) {
          this.features[keys2[j]] = 1;
          this.intentFeatures[intent][keys2[j]] = 1;
        }
        this.intents[intent] = 1;
        result.push(item);
      }
      const keys = Object.keys(this.intentFeatures);
      this.featuresToIntent = {};
      for (let i = 0; i < keys.length; i += 1) {
        const intent = keys[i];
        const features = Object.keys(this.intentFeatures[intent]);
        for (let j = 0; j < features.length; j += 1) {
          const feature = features[j];
          if (!Object.prototype.hasOwnProperty.call(this.featuresToIntent, feature)) {
            this.featuresToIntent[feature] = [];
          }
          this.featuresToIntent[feature].push(intent);
        }
      }
      this.spellCheck.setFeatures(this.features);
      this.numFeatures = Object.keys(this.features).length;
      this.numIntents = Object.keys(this.intents).length;
      input.corpus = result;
      return input;
    }
    addNoneFeature(input) {
      const { corpus } = input;
      if (input.settings && input.settings.useNoneFeature) {
        corpus.push({ input: { nonefeature: 1 }, output: { None: 1 } });
      }
      return input;
    }
    convertToArray(srcInput) {
      const input = srcInput;
      const { classifications } = input;
      if (classifications) {
        if (!this.intentsArr) {
          if (this.intents) {
            this.intentsArr = Object.keys(this.intents);
            if (!this.intents.None) {
              this.intentsArr.push("None");
            }
          } else {
            this.intentsArr = Object.keys(classifications);
          }
        }
        const keys = this.intentsArr;
        const result = [];
        for (let i = 0; i < keys.length; i += 1) {
          const intent = keys[i];
          const score = classifications[intent];
          if (score !== void 0 && (score > 0 || !input.settings.filterZeros)) {
            result.push({ intent, score });
          }
        }
        if (!result.length) {
          result.push({ intent: "None", score: 1 });
        }
        input.classifications = result.sort((a, b) => b.score - a.score);
      }
      return input;
    }
    someSimilar(tokensA, tokensB) {
      for (let i = 0; i < tokensB.length; i += 1) {
        if (tokensA[tokensB[i]]) {
          return true;
        }
      }
      return false;
    }
    matchAllowList(intent, allowList) {
      for (let i = 0; i < allowList.length; i += 1) {
        if (compareWildcars(intent, allowList[i])) {
          return true;
        }
      }
      return false;
    }
    intentIsActivated(intent, tokens, allowList) {
      if (allowList) {
        if (Array.isArray(allowList)) {
          return this.matchAllowList(intent, allowList);
        }
        if (!allowList[intent]) {
          return false;
        }
      }
      const features = this.intentFeatures[intent];
      if (!features) {
        return false;
      }
      const keys = Object.keys(tokens);
      for (let i = 0; i < keys.length; i += 1) {
        if (features[keys[i]]) {
          return true;
        }
      }
      return false;
    }
    filterNonActivated(srcInput) {
      if (this.intentFeatures && srcInput.classifications) {
        const intents = srcInput.classifications.map((x) => x.intent);
        let someModified = false;
        for (let i = 0; i < intents.length; i += 1) {
          const intent = intents[i];
          if (intent !== "None") {
            if (!this.intentIsActivated(
              intent,
              srcInput.tokens,
              srcInput.settings.allowList
            )) {
              srcInput.classifications[i].score = 0;
              someModified = true;
            }
          }
        }
        if (someModified) {
          srcInput.classifications.sort((a, b) => b.score - a.score);
        }
      }
      return srcInput;
    }
    normalizeClassifications(srcInput) {
      const input = srcInput;
      const { classifications } = input;
      if (classifications) {
        let total = 0;
        for (let i = 0; i < classifications.length; i += 1) {
          classifications[i].score **= 2;
          total += classifications[i].score;
        }
        if (total > 0) {
          for (let i = 0; i < classifications.length; i += 1) {
            classifications[i].score /= total;
          }
        }
      } else {
        input.classifications = input.nluAnswer;
      }
      return input;
    }
    textToFeatures(srcInput) {
      const input = srcInput;
      const { tokens } = input;
      const keys = Object.keys(tokens);
      let unknownTokens = 0;
      const features = {};
      for (let i = 0; i < keys.length; i += 1) {
        const token = keys[i];
        if (token === "nonefeature") {
          tokens[token] = this.nonefeatureValue;
        } else if (!this.features || !this.features[token]) {
          unknownTokens += 1;
        } else {
          features[token] = tokens[token];
        }
      }
      let nonedelta = input.settings.nonedeltaValue === void 0 ? this.numIntents / this.numFeatures : this.settings.nonedeltaValue;
      let nonevalue = 0;
      for (let i = 0; i < unknownTokens; i += 1) {
        nonevalue += nonedelta;
        nonedelta *= this.settings.nonedeltaMultiplier;
      }
      if (input.settings && input.settings.useNoneFeature && nonevalue) {
        features.nonefeature = nonevalue;
      }
      input.tokens = features;
      return input;
    }
    async innerTrain() {
      throw new Error("This method should be implemented by child classes");
    }
    async train(corpus, settings) {
      const input = {
        corpus,
        settings: this.applySettings(settings, this.settings)
      };
      return this.runPipeline(input, this.pipelineTrain);
    }
    async getExplanation(input, explanation) {
      if (!explanation) {
        return void 0;
      }
      const normalized = await this.container.get("normalize").run(input);
      const tokenized = await this.container.get("tokenize").run(normalized);
      const { tokens } = tokenized;
      const stemmed = await this.container.get("stem").run(tokenized);
      const stems = stemmed.tokens;
      const result = [];
      result.push({
        token: "",
        stem: "##bias",
        weight: explanation.bias
      });
      for (let i = 0; i < tokens.length; i += 1) {
        const stem = stems[i];
        result.push({
          token: tokens[i],
          stem,
          weight: explanation.weights[stem]
        });
      }
      return result;
    }
    async process(utterance, settings) {
      const input = {
        text: utterance,
        settings: this.applySettings(settings || {}, this.settings)
      };
      let output;
      if (this.pipelineProcess) {
        output = await this.runPipeline(input, this.pipelineProcess);
      } else {
        output = await this.defaultPipelineProcess(input);
      }
      if (Array.isArray(output.classifications)) {
        const explanation = input.settings.returnExplanation ? await this.getExplanation(input, output.explanation) : void 0;
        return {
          classifications: output.classifications,
          entities: void 0,
          explanation
        };
      }
      if (output.intents) {
        output.classifications = output.intents;
        delete output.intents;
      }
      return output;
    }
    toJSON() {
      const result = {
        settings: { ...this.settings },
        features: this.features,
        intents: this.intents,
        intentFeatures: this.intentFeatures,
        featuresToIntent: this.featuresToIntent
      };
      delete result.settings.container;
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      this.features = json.features || {};
      this.intents = json.intents || {};
      this.intentsArr = Object.keys(json.intents);
      this.featuresToIntent = json.featuresToIntent || {};
      this.intentFeatures = json.intentFeatures || {};
      this.spellCheck.setFeatures(this.features);
      this.numFeatures = Object.keys(this.features).length;
      this.numIntents = Object.keys(this.intents).length;
    }
  }
  nlu = Nlu;
  return nlu;
}
var lookup;
var hasRequiredLookup;
function requireLookup() {
  if (hasRequiredLookup) return lookup;
  hasRequiredLookup = 1;
  class Lookup {
    constructor(data, propName = "input") {
      this.dict = {};
      this.items = [];
      if (data) {
        this.buildFromData(data, propName);
      }
    }
    add(key) {
      if (this.dict[key] === void 0) {
        this.dict[key] = this.items.length;
        this.items.push(key);
      }
    }
    buildFromData(data, propName) {
      for (let i = 0; i < data.length; i += 1) {
        const item = data[i][propName];
        const keys = Object.keys(item);
        for (let j = 0; j < keys.length; j += 1) {
          this.add(keys[j]);
        }
      }
    }
    prepare(item) {
      const keys = Object.keys(item);
      const resultKeys = [];
      const resultData = {};
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (this.dict[key] !== void 0) {
          resultKeys.push(this.dict[key]);
          resultData[this.dict[key]] = item[key];
        }
      }
      return {
        keys: resultKeys,
        data: resultData
      };
    }
  }
  lookup = Lookup;
  return lookup;
}
var corpusLookup;
var hasRequiredCorpusLookup;
function requireCorpusLookup() {
  if (hasRequiredCorpusLookup) return corpusLookup;
  hasRequiredCorpusLookup = 1;
  const Lookup = requireLookup();
  class CorpusLookup {
    constructor(features, intents) {
      if (features) {
        this.inputLookup = new Lookup();
        this.outputLookup = new Lookup();
        for (let i = 0; i < features.length; i += 1) {
          this.inputLookup.add(features[i]);
        }
        for (let i = 0; i < intents.length; i += 1) {
          this.outputLookup.add(intents[i]);
        }
        this.numInputs = this.inputLookup.items.length;
        this.numOutputs = this.outputLookup.items.length;
      }
    }
    build(corpus) {
      this.inputLookup = new Lookup(corpus, "input");
      this.outputLookup = new Lookup(corpus, "output");
      this.numInputs = this.inputLookup.items.length;
      this.numOutputs = this.outputLookup.items.length;
      const result = [];
      for (let i = 0; i < corpus.length; i += 1) {
        const { input, output } = corpus[i];
        result.push({
          input: this.inputLookup.prepare(input),
          output: this.outputLookup.prepare(output)
        });
      }
      return result;
    }
    transformInput(input) {
      return this.inputLookup.prepare(input);
    }
  }
  corpusLookup = CorpusLookup;
  return corpusLookup;
}
var neuralNetwork;
var hasRequiredNeuralNetwork;
function requireNeuralNetwork() {
  if (hasRequiredNeuralNetwork) return neuralNetwork;
  hasRequiredNeuralNetwork = 1;
  const CorpusLookup = requireCorpusLookup();
  const defaultSettings = {
    iterations: 2e4,
    errorThresh: 5e-5,
    deltaErrorThresh: 1e-6,
    learningRate: 0.6,
    momentum: 0.5,
    alpha: 0.07,
    log: false
  };
  class NeuralNetwork {
    constructor(settings = {}) {
      this.settings = settings;
      this.applySettings(this.settings, defaultSettings);
      if (this.settings.log === true) {
        this.logFn = (status, time) => console.log(
          `Epoch ${status.iterations} loss ${status.error} time ${time}ms`
        );
      } else if (typeof this.settings.log === "function") {
        this.logFn = this.settings.log;
      }
    }
    applySettings(obj = {}, settings = {}) {
      Object.keys(settings).forEach((key) => {
        if (obj[key] === void 0) {
          obj[key] = settings[key];
        }
      });
      return obj;
    }
    initialize(numInputs, outputNames) {
      this.perceptronsByName = {};
      this.perceptrons = [];
      this.outputs = {};
      this.numPerceptrons = outputNames.length;
      for (let i = 0; i < outputNames.length; i += 1) {
        const name = outputNames[i];
        this.outputs[name] = 0;
        const perceptron = {
          name,
          id: i,
          weights: new Float32Array(numInputs),
          changes: new Float32Array(numInputs),
          bias: 0
        };
        this.perceptrons.push(perceptron);
        this.perceptronsByName[name] = perceptron;
      }
    }
    runInputPerceptron(perceptron, input) {
      const sum = input.keys.reduce(
        (prev, key) => prev + input.data[key] * perceptron.weights[key],
        perceptron.bias
      );
      return sum <= 0 ? 0 : this.settings.alpha * sum;
    }
    runInput(input) {
      for (let i = 0; i < this.numPerceptrons; i += 1) {
        this.outputs[this.perceptrons[i].name] = this.runInputPerceptron(
          this.perceptrons[i],
          input
        );
      }
      return this.outputs;
    }
    get isRunnable() {
      return !!this.numPerceptrons;
    }
    run(input) {
      return this.numPerceptrons ? this.runInput(this.lookup.transformInput(input)) : void 0;
    }
    prepareCorpus(corpus) {
      this.lookup = new CorpusLookup();
      return this.lookup.build(corpus);
    }
    verifyIsInitialized() {
      if (!this.perceptrons) {
        this.initialize(this.lookup.numInputs, this.lookup.outputLookup.items);
      }
    }
    trainPerceptron(perceptron, data) {
      const { alpha, momentum } = this.settings;
      const { changes, weights } = perceptron;
      let error = 0;
      for (let i = 0; i < data.length; i += 1) {
        const { input, output } = data[i];
        const actualOutput = this.runInputPerceptron(perceptron, input);
        const expectedOutput = output.data[perceptron.id] || 0;
        const currentError = expectedOutput - actualOutput;
        if (currentError) {
          error += currentError ** 2;
          const delta = (actualOutput > 0 ? 1 : alpha) * currentError * this.decayLearningRate;
          for (let j = 0; j < input.keys.length; j += 1) {
            const key = input.keys[j];
            const change = delta * input.data[key] + momentum * changes[key];
            changes[key] = change;
            weights[key] += change;
          }
          perceptron.bias += delta;
        }
      }
      return error;
    }
    train(corpus) {
      if (!corpus || !corpus.length) {
        return {};
      }
      const useNoneFeature = corpus[corpus.length - 1].input.nonefeature !== void 0;
      if (useNoneFeature) {
        const intents = {};
        for (let i = 0; i < corpus.length - 1; i += 1) {
          const tokens = Object.keys(corpus[i].output);
          for (let j = 0; j < tokens.length; j += 1) {
            if (!intents[tokens[j]]) {
              intents[tokens[j]] = 1;
            }
          }
        }
        const current = corpus[corpus.length - 1];
        const keys = Object.keys(intents);
        for (let i = 0; i < keys.length; i += 1) {
          current.output[keys[i]] = 1e-7;
        }
      }
      const data = this.prepareCorpus(corpus);
      if (!this.status) {
        this.status = { error: Infinity, deltaError: Infinity, iterations: 0 };
      }
      this.verifyIsInitialized();
      const minError = this.settings.errorThresh;
      const minDelta = this.settings.deltaErrorThresh;
      while (this.status.iterations < this.settings.iterations && this.status.error > minError && this.status.deltaError > minDelta) {
        const hrstart = /* @__PURE__ */ new Date();
        this.status.iterations += 1;
        this.decayLearningRate = this.settings.learningRate / (1 + 1e-3 * this.status.iterations);
        const lastError = this.status.error;
        this.status.error = 0;
        for (let i = 0; i < this.numPerceptrons; i += 1) {
          this.status.error += this.trainPerceptron(this.perceptrons[i], data);
        }
        this.status.error /= this.numPerceptrons * data.length;
        this.status.deltaError = Math.abs(this.status.error - lastError);
        const hrend = /* @__PURE__ */ new Date();
        if (this.logFn) {
          this.logFn(this.status, hrend.getTime() - hrstart.getTime());
        }
      }
      return this.status;
    }
    explain(input, intent) {
      const transformedInput = this.lookup.transformInput(input);
      const result = {};
      const intentIndex = this.lookup.outputLookup.dict[intent];
      if (intentIndex === void 0) {
        return {};
      }
      for (let i = 0; i < transformedInput.keys.length; i += 1) {
        const key = transformedInput.keys[i];
        result[this.lookup.inputLookup.items[key]] = this.perceptrons[intentIndex].weights[key];
      }
      return {
        weights: result,
        bias: this.perceptrons[intentIndex].bias
      };
    }
    toJSON() {
      const settings = {};
      const keys = Object.keys(this.settings);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (this.settings[key] !== defaultSettings[key]) {
          settings[key] = this.settings[key];
        }
      }
      if (!this.lookup) {
        return {
          settings
        };
      }
      const features = this.lookup.inputLookup.items;
      const intents = this.lookup.outputLookup.items;
      const perceptrons = [];
      for (let i = 0; i < this.perceptrons.length; i += 1) {
        const perceptron = this.perceptrons[i];
        const weights = [...perceptron.weights, perceptron.bias];
        perceptrons.push(weights);
      }
      return {
        settings,
        features,
        intents,
        perceptrons
      };
    }
    fromJSON(json) {
      this.settings = this.applySettings({
        ...defaultSettings,
        ...json.settings
      });
      if (json.features) {
        this.lookup = new CorpusLookup(json.features, json.intents);
        this.initialize(json.features.length, json.intents);
        for (let i = 0; i < this.perceptrons.length; i += 1) {
          const perceptron = this.perceptrons[i];
          const data = json.perceptrons[i];
          perceptron.bias = data[data.length - 1];
          for (let j = 0; j < json.features.length; j += 1) {
            perceptron.weights[j] = data[j];
          }
        }
      }
    }
  }
  neuralNetwork = NeuralNetwork;
  return neuralNetwork;
}
var src$7;
var hasRequiredSrc$7;
function requireSrc$7() {
  if (hasRequiredSrc$7) return src$7;
  hasRequiredSrc$7 = 1;
  const NeuralNetwork = requireNeuralNetwork();
  src$7 = {
    NeuralNetwork
  };
  return src$7;
}
var nluNeural;
var hasRequiredNluNeural;
function requireNluNeural() {
  if (hasRequiredNluNeural) return nluNeural;
  hasRequiredNluNeural = 1;
  const { NeuralNetwork } = requireSrc$7();
  const Nlu = requireNlu();
  class NeuralNlu extends Nlu {
    async innerTrain(srcInput) {
      const input = srcInput;
      this.neuralNetwork = new NeuralNetwork(input.settings, this.container);
      input.status = await this.neuralNetwork.train(input.corpus);
      return input;
    }
    innerProcess(srcInput) {
      const input = srcInput;
      input.classifications = this.neuralNetwork ? this.neuralNetwork.run(input.tokens) || { None: 1 } : { None: 1 };
      this.convertToArray(input);
      const { intent } = input.classifications[0];
      if (input.settings && input.settings.returnExplanation && intent && this.neuralNetwork && intent !== "None") {
        input.explanation = this.neuralNetwork.explain(input.tokens, intent);
      }
      return input;
    }
    registerDefault() {
      super.registerDefault();
      this.container.register("NeuralNlu", NeuralNlu, false);
    }
    toJSON() {
      const result = super.toJSON();
      result.neuralNetwork = this.neuralNetwork ? this.neuralNetwork.toJSON() : void 0;
      return result;
    }
    fromJSON(json) {
      super.fromJSON(json);
      if (json.neuralNetwork) {
        this.neuralNetwork = new NeuralNetwork();
        this.neuralNetwork.fromJSON(json.neuralNetwork);
      }
    }
  }
  nluNeural = NeuralNlu;
  return nluNeural;
}
var domainManager;
var hasRequiredDomainManager;
function requireDomainManager() {
  if (hasRequiredDomainManager) return domainManager;
  hasRequiredDomainManager = 1;
  const { Clonable, compareWildcars } = requireSrc$9();
  const defaultDomainName = "master_domain";
  class DomainManager extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      this.applySettings(this.settings, { locale: "en" });
      if (!this.settings.tag) {
        this.settings.tag = `domain-manager-${this.settings.locale}`;
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.domains = {};
      this.addDomain(defaultDomainName);
      this.stemDict = {};
      this.intentDict = {};
      this.sentences = [];
      this.applySettings(this, {
        pipelineTrain: this.getPipeline(`${this.settings.tag}-train`),
        pipelineProcess: this.getPipeline(`${this.settings.tag}-process`)
      });
    }
    registerDefault() {
      this.container.registerConfiguration(
        "domain-manager-??",
        {
          nluByDomain: {
            default: {
              className: "NeuralNlu",
              settings: {}
            }
          },
          trainByDomain: false,
          useStemDict: true
        },
        false
      );
      this.container.registerPipeline(
        "domain-manager-??-train",
        [
          ".trainStemmer",
          ".generateCorpus",
          ".fillStemDict",
          ".innerTrain",
          "output.status"
        ],
        false
      );
    }
    getDomainInstance(domainName) {
      if (!this.settings.nluByDomain) {
        this.settings.nluByDomain = {};
      }
      const domainSettings = this.settings.nluByDomain[domainName] || this.settings.nluByDomain.default || {
        className: "NeuralNlu",
        settings: {}
      };
      return this.container.get(
        domainSettings.className || "NeuralNlu",
        this.applySettings(
          { locale: this.settings.locale },
          domainSettings.settings || {}
        )
      );
    }
    addDomain(name) {
      if (!this.domains[name]) {
        this.domains[name] = this.getDomainInstance(name);
      }
      return this.domains[name];
    }
    removeDomain(name) {
      delete this.domains[name];
    }
    async generateStemKey(srcTokens) {
      let tokens;
      if (typeof srcTokens !== "string") {
        tokens = srcTokens;
      } else {
        const input = await this.prepare({ utterance: srcTokens });
        tokens = await input.stems;
      }
      if (!Array.isArray(tokens)) {
        tokens = Object.keys(tokens);
      }
      return tokens.slice().sort().join();
    }
    add(domain, utterance, intent) {
      if (!intent) {
        this.sentences.push({
          domain: defaultDomainName,
          utterance: domain,
          intent: utterance
        });
      } else {
        this.sentences.push({ domain, utterance, intent });
      }
    }
    getSentences() {
      return this.sentences;
    }
    remove(srcDomain, srcUtterance, srcIntent) {
      const domain = srcIntent ? srcDomain : defaultDomainName;
      const utterance = srcIntent ? srcUtterance : srcDomain;
      const intent = srcIntent || srcUtterance;
      for (let i = 0; i < this.sentences.length; i += 1) {
        const sentence = this.sentences[i];
        if (sentence.domain === domain && sentence.utterance === utterance && sentence.intent === intent) {
          this.sentences.splice(i, 1);
          return true;
        }
      }
      return false;
    }
    async trainStemmer(srcInput) {
      const input = srcInput;
      if (!this.cache) {
        this.cache = {
          stem: this.container.get("stem")
        };
      }
      for (let i = 0; i < this.sentences.length; i += 1) {
        const current = this.sentences[i];
        const subInput = { ...current, ...input };
        await this.cache.stem.addForTraining(subInput);
      }
      await this.cache.stem.train(input);
      return input;
    }
    innerGenerateCorpus(domainName) {
      this.intentDict = {};
      const result = {};
      result[defaultDomainName] = [];
      for (let i = 0; i < this.sentences.length; i += 1) {
        const sentence = this.sentences[i];
        this.intentDict[sentence.intent] = sentence.domain;
        const domain = domainName || sentence.domain;
        if (!result[domain]) {
          result[domain] = [];
        }
        const domainObj = result[domain];
        domainObj.push({
          utterance: sentence.utterance,
          intent: sentence.intent
        });
        if (!domainName) {
          result[defaultDomainName].push({
            utterance: sentence.utterance,
            intent: sentence.domain
          });
        }
      }
      return result;
    }
    async generateCorpus(srcInput) {
      const input = srcInput;
      input.corpus = this.innerGenerateCorpus(
        this.settings.trainByDomain ? void 0 : defaultDomainName
      );
      return input;
    }
    async prepare(srcInput) {
      const input = srcInput;
      const isString = typeof input === "string";
      const utterance = isString ? input : input.utterance;
      const nlu2 = this.addDomain(defaultDomainName);
      const tokens = nlu2.prepare(utterance);
      if (isString) {
        return tokens;
      }
      input.stems = tokens;
      return input;
    }
    async fillStemDict(srcInput) {
      this.stemDict = {};
      for (let i = 0; i < this.sentences.length; i += 1) {
        const { utterance, intent, domain } = this.sentences[i];
        const key = await this.generateStemKey(utterance);
        if (!key || key === "") {
          this.container.get("logger").warn(`This utterance: "${utterance}" contains only stop words`);
        }
        this.stemDict[key] = {
          intent,
          domain
        };
      }
      return srcInput;
    }
    async innerTrain(srcInput) {
      const input = srcInput;
      const { corpus } = input;
      const keys = Object.keys(corpus);
      const status = {};
      for (let i = 0; i < keys.length; i += 1) {
        const nlu2 = this.addDomain(keys[i]);
        const options = { useNoneFeature: this.settings.useNoneFeature };
        if (srcInput.settings && srcInput.settings.log !== void 0) {
          options.log = srcInput.settings.log;
        }
        const result = await nlu2.train(corpus[keys[i]], options);
        status[keys[i]] = result.status;
      }
      input.status = status;
      return input;
    }
    async train(settings) {
      const input = {
        domainManager: this,
        settings: settings || this.settings
      };
      return this.runPipeline(input, this.pipelineTrain);
    }
    matchAllowList(intent, allowList) {
      for (let i = 0; i < allowList.length; i += 1) {
        if (compareWildcars(intent, allowList[i])) {
          return true;
        }
      }
      return false;
    }
    async classifyByStemDict(utterance, domainName, allowList) {
      const key = await this.generateStemKey(utterance);
      const resolved = this.stemDict[key];
      if (resolved && (!domainName || resolved.domain === domainName)) {
        if (allowList && !this.matchAllowList(resolved.intent, allowList)) {
          return void 0;
        }
        const classifications = [];
        classifications.push({
          intent: resolved.intent,
          score: 1
        });
        const intents = Object.keys(this.intentDict);
        for (let i = 0; i < intents.length; i += 1) {
          if (intents[i] !== resolved.intent) {
            classifications.push({ intent: intents[i], score: 0 });
          }
        }
        return { domain: resolved.domain, classifications };
      }
      return void 0;
    }
    async innerClassify(srcInput, domainName) {
      const input = srcInput;
      const settings = this.applySettings({ ...input.settings }, this.settings);
      if (settings.useStemDict) {
        const result = await this.classifyByStemDict(
          input.utterance,
          domainName,
          srcInput.settings ? srcInput.settings.allowList : void 0
        );
        if (result) {
          input.classification = result;
          input.explanation = [
            {
              token: "",
              stem: "##exact",
              weight: 1
            }
          ];
          return input;
        }
      }
      if (domainName) {
        const nlu2 = this.domains[domainName];
        if (!nlu2) {
          input.classification = {
            domain: "default",
            classifications: [{ intent: "None", score: 1 }]
          };
          return input;
        }
        const nluAnswer = await nlu2.process(
          input.utterance,
          input.settings || this.settings
        );
        let classifications;
        if (Array.isArray(nluAnswer)) {
          classifications = nluAnswer;
        } else {
          classifications = nluAnswer.classifications;
          input.nluAnswer = nluAnswer;
        }
        let finalDomain;
        if (domainName === defaultDomainName) {
          if (classifications && classifications.length) {
            finalDomain = this.intentDict[classifications[0].intent];
          } else {
            finalDomain = defaultDomainName;
          }
        } else {
          finalDomain = domainName;
        }
        input.classification = {
          domain: finalDomain,
          classifications
        };
        return input;
      }
      let domain = defaultDomainName;
      if (input.settings.trainByDomain === void 0 && this.settings.trainByDomain || input.settings.trainByDomain) {
        const nlu2 = this.domains[defaultDomainName];
        let classifications = await nlu2.process(input.utterance);
        if (classifications.classifications) {
          classifications = classifications.classifications;
        }
        if (Object.keys(this.domains).length === 1) {
          input.classification = {
            domain: "default",
            classifications
          };
          return input;
        }
        domain = classifications[0].intent;
        if (domain === "None") {
          input.classification = {
            domain: "default",
            classifications: [{ intent: "None", score: 1 }]
          };
          return input;
        }
      }
      return this.innerClassify(input, domain);
    }
    async defaultPipelineProcess(input) {
      const output = await this.innerClassify(input);
      return output.classification;
    }
    async process(utterance, settings) {
      const input = typeof utterance === "string" ? {
        utterance,
        settings: settings || this.settings
      } : utterance;
      if (this.pipelineProcess) {
        return this.runPipeline(input, this.pipelineProcess);
      }
      return this.defaultPipelineProcess(input);
    }
    toJSON() {
      const result = {
        settings: this.settings,
        stemDict: this.stemDict,
        intentDict: this.intentDict,
        sentences: this.sentences,
        domains: {}
      };
      delete result.settings.container;
      const keys = Object.keys(this.domains);
      for (let i = 0; i < keys.length; i += 1) {
        result.domains[keys[i]] = this.domains[keys[i]].toJSON();
      }
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      this.stemDict = json.stemDict;
      this.intentDict = json.intentDict;
      this.sentences = json.sentences;
      const keys = Object.keys(json.domains);
      for (let i = 0; i < keys.length; i += 1) {
        const domain = this.addDomain(keys[i]);
        domain.fromJSON(json.domains[keys[i]]);
      }
    }
  }
  domainManager = DomainManager;
  return domainManager;
}
const require$$0 = [
  [
    "ar",
    "arb",
    "Arabic"
  ],
  [
    "bn",
    "ben",
    "Bengali"
  ],
  [
    "ca",
    "cat",
    "Catalan"
  ],
  [
    "cs",
    "ces",
    "Czech"
  ],
  [
    "da",
    "dan",
    "Danish"
  ],
  [
    "de",
    "deu",
    "German"
  ],
  [
    "el",
    "ell",
    "Greek"
  ],
  [
    "en",
    "eng",
    "English"
  ],
  [
    "eu",
    "eus",
    "Basque"
  ],
  [
    "fa",
    "fas",
    "Persian"
  ],
  [
    "fi",
    "fin",
    "Finnish"
  ],
  [
    "fr",
    "fra",
    "French"
  ],
  [
    "ga",
    "gle",
    "Irish"
  ],
  [
    "gl",
    "glg",
    "Galician"
  ],
  [
    "hi",
    "hin",
    "Hindi"
  ],
  [
    "hu",
    "hun",
    "Hungarian"
  ],
  [
    "hy",
    "hye",
    "Armenian"
  ],
  [
    "id",
    "ind",
    "Indonesian"
  ],
  [
    "it",
    "ita",
    "Italian"
  ],
  [
    "ja",
    "jpn",
    "Japanese"
  ],
  [
    "ko",
    "kor",
    "Korean"
  ],
  [
    "lt",
    "lit",
    "Lithuanian"
  ],
  [
    "ne",
    "nep",
    "Nepali"
  ],
  [
    "nl",
    "nld",
    "Dutch"
  ],
  [
    "no",
    "nor",
    "Norwegian"
  ],
  [
    "pl",
    "pol",
    "Polish"
  ],
  [
    "pt",
    "por",
    "Portuguese"
  ],
  [
    "ro",
    "ron",
    "Romanian"
  ],
  [
    "ru",
    "rus",
    "Russian"
  ],
  [
    "sr",
    "srp",
    "Serbian"
  ],
  [
    "sl",
    "slv",
    "Slovenian"
  ],
  [
    "es",
    "spa",
    "Spanish"
  ],
  [
    "sv",
    "swe",
    "Swedish"
  ],
  [
    "ta",
    "tam",
    "Tamil"
  ],
  [
    "tl",
    "tgl",
    "Tagalog"
  ],
  [
    "th",
    "tha",
    "Thai"
  ],
  [
    "tr",
    "tur",
    "Turkish"
  ],
  [
    "uk",
    "ukr",
    "Ukrainian"
  ],
  [
    "zh",
    "cmn",
    "Chinese"
  ]
];
const Latin = { "spa": "", "eng": "", "por": "", "ind": "", "fra": "", "deu": "", "ita": "", "tur": "", "nld": "", "tgl": "", "hun": "", "ces": "", "swe": "", "fin": "", "dan": "", "cat": "", "glg": "", "slv": "" };
const Cyrillic = { "rus": "", "ukr": "" };
const Arabic = { "arb": "", "fas": "" };
const Devanagari = { "hin": "" };
const Ethiopic = {};
const Hebrew = {};
const require$$1 = {
  Latin,
  Cyrillic,
  Arabic,
  Devanagari,
  Ethiopic,
  Hebrew
};
var language;
var hasRequiredLanguage;
function requireLanguage() {
  if (hasRequiredLanguage) return language;
  hasRequiredLanguage = 1;
  const languageData = require$$0;
  const data = require$$1;
  const scripts = {
    cmn: /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/g,
    Latin: /[A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]/g,
    Cyrillic: /[\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69D\uA69F]/g,
    Arabic: /[\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u065F\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B2\u08E4-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC]|\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]/g,
    ben: /[\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB]/g,
    Devanagari: /[\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FB]/g,
    jpn: /[\u3041-\u3096\u309D-\u309F]|\uD82C\uDC01|\uD83C\uDE00|[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82C\uDC00/g,
    kor: /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,
    tel: /[\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F]/g,
    tam: /[\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA]/g,
    guj: /[\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1]/g,
    kan: /[\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2]/g,
    mal: /[\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D79-\u0D7F]/g,
    Myanmar: /[\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F]/g,
    ori: /[\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77]/g,
    pan: /[\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75]/g,
    Ethiopic: /[\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]/g,
    tha: /[\u0E01-\u0E3A\u0E40-\u0E5B]/g,
    sin: /[\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4]|\uD804[\uDDE1-\uDDF4]/g,
    ell: /[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45]/g,
    khm: /[\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF]/g,
    hye: /[\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17]/g,
    sat: /[\u1C50-\u1C7F]/g,
    bod: /[\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA]/g,
    Hebrew: /[\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F]/g,
    kat: /[\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D]/g,
    lao: /[\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF]/g,
    zgh: /[\u2D30-\u2D67\u2D6F\u2D70\u2D7F]/g,
    iii: /[\uA000-\uA48C\uA490-\uA4C6]/g,
    aii: /[\u0700-\u070D\u070F-\u074A\u074D-\u074F]/g
  };
  const scriptKeys = Object.keys(scripts);
  const und = () => [["und", 1]];
  class Language {
    constructor() {
      this.languagesAlpha3 = {};
      this.languagesAlpha2 = {};
      this.extraSentences = [];
      this.buildData();
    }
    static getTrigrams(srcValue) {
      const result = [];
      const value = srcValue ? ` ${String(srcValue).replace(/[\u0021-\u0040]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase()} ` : "";
      if (!value || value.length < 3) {
        return result;
      }
      for (let i = 0, l = value.length - 2; i < l; i += 1) {
        result[i] = value.substr(i, 3);
      }
      return result;
    }
    static asTuples(value) {
      const dictionary = Language.getTrigrams(value).reduce(
        (srcprev, current) => {
          const prev = srcprev;
          prev[current] = (prev[current] || 0) + 1;
          return prev;
        },
        {}
      );
      const tuples = [];
      Object.keys(dictionary).forEach((key) => {
        tuples.push([key, dictionary[key]]);
      });
      tuples.sort((a, b) => a[1] - b[1]);
      return tuples;
    }
    static getDistance(trigrams, model) {
      let distance = 0;
      trigrams.forEach((currentTrigram) => {
        distance += currentTrigram[0] in model ? Math.abs(currentTrigram[1] - model[currentTrigram[0]] - 1) : 300;
      });
      return distance;
    }
    static getOccurrence(value, expression) {
      const count = value.match(expression);
      return (count ? count.length : 0) / value.length || 0;
    }
    static isLatin(value) {
      let total = 0;
      const half = value.length / 2;
      for (let i = 0; i < value.length; i += 1) {
        const c = value.charCodeAt(i);
        if (c >= 32 && c <= 126) {
          total += 1;
          if (total > half) {
            return true;
          }
        }
      }
      return total > half;
    }
    static getTopScript(value) {
      if (Language.isLatin(value)) {
        return ["Latin", 1];
      }
      let topCount = -1;
      let topScript;
      for (let i = 0; i < scriptKeys.length; i += 1) {
        const script = scriptKeys[i];
        const count = Language.getOccurrence(value, scripts[script]);
        if (count > topCount) {
          topCount = count;
          topScript = script;
          if (topCount === 1) {
            return [topScript, topCount];
          }
        }
      }
      return [topScript, topCount];
    }
    static filterLanguages(languages, allowList, denyList) {
      if (allowList.length === 0 && denyList.length === 0) {
        return languages;
      }
      const filteredLanguages = {};
      Object.keys(languages).forEach((language2) => {
        if ((allowList.length === 0 || allowList.indexOf(language2) > -1) && denyList.indexOf(language2) === -1) {
          filteredLanguages[language2] = languages[language2];
        }
      });
      return filteredLanguages;
    }
    static getDistances(trigrams, srcLanguages, options) {
      const distances = [];
      const allowList = options.allowList || [];
      const denyList = options.denyList || [];
      const languages = Language.filterLanguages(
        srcLanguages,
        allowList,
        denyList
      );
      if (!languages) {
        return und();
      }
      Object.keys(languages).forEach((language2) => {
        distances.push([
          language2,
          Language.getDistance(trigrams, languages[language2])
        ]);
      });
      return distances.sort((a, b) => a[1] - b[1]);
    }
    static detectAll(srcValue, settings = {}) {
      const minLength = settings.minLength || 10;
      if (!srcValue || srcValue.length < minLength) {
        return und();
      }
      const value = srcValue.substr(0, 2048);
      const script = Language.getTopScript(value);
      if (!(script[0] in data) && script[1] > 0.5) {
        if (settings.allowList) {
          if (settings.allowList.includes(script[0])) {
            return [[script[0], 1]];
          }
          if (script[0] === "cmn" && settings.allowList.includes("jpn")) {
            return [["jpn", 1]];
          }
        } else {
          return [[script[0], 1]];
        }
      }
      if (data[script[0]]) {
        const distances = Language.getDistances(
          Language.asTuples(value),
          data[script[0]],
          settings
        );
        if (distances[0][0] === "und") {
          return [[script[0], 1]];
        }
        const min = distances[0][1];
        const max = value.length * 300 - min;
        return distances.map((d) => [d[0], 1 - (d[1] - min) / max || 0]);
      }
      return [[script[0], 1]];
    }
    buildData() {
      for (let i = 0; i < languageData.length; i += 1) {
        const language2 = {
          alpha2: languageData[i][0],
          alpha3: languageData[i][1],
          name: languageData[i][2]
        };
        this.languagesAlpha3[language2.alpha3] = language2;
        this.languagesAlpha2[language2.alpha2] = language2;
      }
    }
    transformAllowList(allowList) {
      const result = [];
      for (let i = 0; i < allowList.length; i += 1) {
        if (allowList[i].length === 3) {
          result.push(allowList[i]);
        } else {
          const language2 = this.languagesAlpha2[allowList[i]];
          if (language2) {
            result.push(language2.alpha3);
          }
        }
      }
      return result;
    }
    guess(utterance, allowList, limit) {
      const options = {};
      if (utterance.length < 10) {
        options.minLength = utterance.length;
      }
      if (allowList && allowList.length && allowList.length > 0) {
        options.allowList = this.transformAllowList(allowList);
      }
      const scores = Language.detectAll(utterance, options);
      const result = [];
      for (let i = 0; i < scores.length; i += 1) {
        const language2 = this.languagesAlpha3[scores[i][0]];
        if (language2) {
          result.push({
            alpha3: language2.alpha3,
            alpha2: language2.alpha2,
            language: language2.name,
            score: scores[i][1]
          });
          if (limit && result.length >= limit) {
            break;
          }
        }
      }
      return result;
    }
    /**
     * Given an utterance, an allow list of iso codes and the limit of results,
     * return the language with the best score.
     * The allowList is optional.
     * @param {String} utterance Utterance wich we want to guess the language.
     * @param {String[]} allowList allowList of accepted languages.
     * @return {Object} Best guess.
     */
    guessBest(utterance, allowList) {
      return this.guess(utterance, allowList, 1)[0];
    }
    addTrigrams(locale, sentence) {
      const language2 = this.languagesAlpha2[locale];
      const iso3 = language2 ? language2.alpha3 : locale;
      const script = Language.getTopScript(sentence)[0];
      const trigrams = Language.getTrigrams(sentence);
      if (data[script]) {
        if (!data[script][iso3]) {
          data[script][iso3] = {};
        }
        trigrams.forEach((trigram) => {
          data[script][iso3][trigram] = 1;
        });
      }
    }
    addExtraSentence(locale, sentence) {
      this.extraSentences.push([locale, sentence]);
      this.addTrigrams(locale, sentence);
    }
    processExtraSentences() {
      this.extraSentences.forEach((item) => {
        this.addTrigrams(item[0], item[1]);
      });
    }
    static lansplit(s) {
      if (s.includes("|")) {
        return s.split("|");
      }
      const result = [];
      for (let i = 0; i < s.length; i += 3) {
        result.push(s.substr(i, 3));
      }
      return result;
    }
    static addModel(script, name, value) {
      const languages = data[script];
      const model = Language.lansplit(value);
      let weight = model.length;
      const trigrams = {};
      while (weight > 0) {
        weight -= 1;
        trigrams[model[weight]] = weight;
      }
      languages[name] = trigrams;
    }
    addModel(script, name, value) {
      Language.addModel(script, name, value);
    }
    static buildModel() {
      Object.keys(data).forEach((script) => {
        const languages = data[script];
        Object.keys(languages).forEach((name) => {
          Language.addModel(script, name, languages[name]);
        });
      });
    }
  }
  Language.buildModel();
  language = Language;
  return language;
}
var src$6;
var hasRequiredSrc$6;
function requireSrc$6() {
  if (hasRequiredSrc$6) return src$6;
  hasRequiredSrc$6 = 1;
  const Language = requireLanguage();
  src$6 = {
    Language
  };
  return src$6;
}
var nluManager;
var hasRequiredNluManager;
function requireNluManager() {
  if (hasRequiredNluManager) return nluManager;
  hasRequiredNluManager = 1;
  const { Clonable } = requireSrc$9();
  const { Language } = requireSrc$6();
  const DomainManager = requireDomainManager();
  class NluManager extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = "nlu-manager";
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      if (!this.container.get("Language")) {
        this.container.register("Language", Language, false);
      }
      this.guesser = this.container.get("Language");
      this.locales = [];
      this.languageNames = {};
      this.domainManagers = {};
      this.intentDomains = {};
      if (this.settings.locales) {
        this.addLanguage(this.settings.locales);
      }
      this.applySettings(this, {
        pipelineTrain: this.getPipeline(`${this.settings.tag}-train`),
        pipelineProcess: this.getPipeline(`${this.settings.tag}-process`)
      });
    }
    registerDefault() {
      this.container.registerConfiguration("nlu-manager", {}, false);
      this.container.registerPipeline(
        "nlu-manager-train",
        [".innerTrain"],
        false
      );
    }
    describeLanguage(locale, name) {
      this.languageNames[locale] = { locale, name };
    }
    addLanguage(srcLocales) {
      if (srcLocales) {
        const locales = Array.isArray(srcLocales) ? srcLocales : [srcLocales];
        for (let i = 0; i < locales.length; i += 1) {
          const locale = locales[i].substr(0, 2).toLowerCase();
          if (!this.locales.includes(locale)) {
            this.locales.push(locale);
          }
          if (!this.domainManagers[locale]) {
            this.domainManagers[locale] = new DomainManager(
              {
                locale,
                ...this.settings.domain,
                useNoneFeature: this.settings.useNoneFeature,
                trainByDomain: this.settings.trainByDomain
              },
              this.container
            );
          }
        }
      }
    }
    removeLanguage(locales) {
      if (Array.isArray(locales)) {
        locales.forEach((locale) => this.removeLanguage(locale));
      } else {
        delete this.domainManagers[locales];
        const index2 = this.locales.indexOf(locales);
        if (index2 !== -1) {
          this.locales.splice(index2, 1);
        }
      }
    }
    guessLanguage(srcInput) {
      const input = srcInput;
      const isString = typeof input === "string";
      if (this.locales.length === 1) {
        if (isString) {
          return this.locales[0];
        }
        [input.locale] = this.locales;
        return input;
      }
      if (!input) {
        return isString ? void 0 : input;
      }
      if (!isString && input.locale) {
        return input;
      }
      const utterance = isString ? input : input.utterance;
      if (this.locales.length === 1) {
        if (isString) {
          return this.locales[0];
        }
        [input.locale] = this.locales;
      }
      const guess = this.guesser.guess(utterance, this.locales, 1);
      const locale = guess && guess.length > 0 ? guess[0].alpha2 : void 0;
      if (isString) {
        return locale;
      }
      input.locale = locale;
      return input;
    }
    assignDomain(srcLocale, srcIntent, srcDomain) {
      const locale = srcDomain ? srcLocale.substr(0, 2).toLowerCase() : void 0;
      const intent = srcDomain ? srcIntent : srcLocale;
      const domain = srcDomain || srcIntent;
      if (locale) {
        if (!this.intentDomains[locale]) {
          this.intentDomains[locale] = {};
        }
        this.intentDomains[locale][intent] = domain;
      } else {
        for (let i = 0; i < this.locales.length; i += 1) {
          this.assignDomain(this.locales[i], intent, domain);
        }
      }
    }
    getIntentDomain(srcLocale, intent) {
      const locale = srcLocale.substr(0, 2).toLowerCase();
      if (!this.intentDomains[locale]) {
        return "default";
      }
      return this.intentDomains[locale][intent] || "default";
    }
    getDomains() {
      const result = {};
      const locales = Object.keys(this.intentDomains);
      for (let i = 0; i < locales.length; i += 1) {
        const locale = locales[i];
        result[locale] = {};
        const intents = Object.keys(this.intentDomains[locale]);
        for (let j = 0; j < intents.length; j += 1) {
          const intent = intents[j];
          const domain = this.intentDomains[locale][intent];
          if (!result[locale][domain]) {
            result[locale][domain] = [];
          }
          result[locale][domain].push(intent);
        }
      }
      return result;
    }
    consolidateLocale(srcLocale, utterance) {
      const locale = srcLocale ? srcLocale.substr(0, 2).toLowerCase() : this.guessLanguage(utterance);
      if (!locale) {
        throw new Error("Locale must be defined");
      }
      return locale;
    }
    consolidateManager(locale) {
      const manager = this.domainManagers[locale];
      if (!manager) {
        throw new Error(`Domain Manager not found for locale ${locale}`);
      }
      return manager;
    }
    add(srcLocale, utterance, intent) {
      const locale = this.consolidateLocale(srcLocale, utterance);
      const manager = this.consolidateManager(locale);
      const domain = this.getIntentDomain(locale, intent);
      this.guesser.addExtraSentence(locale, utterance);
      manager.add(domain, utterance, intent);
    }
    remove(srcLocale, utterance, intent) {
      const locale = this.consolidateLocale(srcLocale, utterance);
      const manager = this.consolidateManager(locale);
      const domain = this.getIntentDomain(locale, intent);
      manager.remove(domain, utterance, intent);
    }
    async innerTrain(settings) {
      let locales = settings.locales || this.locales;
      if (!Array.isArray(locales)) {
        locales = [locales];
      }
      const promises = locales.filter((locale) => this.domainManagers[locale]).map((locale) => this.domainManagers[locale].train(settings.settings));
      return Promise.all(promises);
    }
    async train(settings) {
      const input = {
        nluManager: this,
        settings: this.applySettings(settings, this.settings)
      };
      delete input.settings.tag;
      return this.runPipeline(input, this.pipelineTrain);
    }
    fillLanguage(srcInput) {
      const input = srcInput;
      input.languageGuessed = false;
      if (!input.locale) {
        input.locale = this.guessLanguage(input.utterance);
        input.languageGuessed = true;
      }
      if (input.locale) {
        input.localeIso2 = input.locale.substr(0, 2).toLowerCase();
        input.language = (this.languageNames[input.localeIso2] || this.guesser.languagesAlpha2[input.localeIso2] || {}).name;
      }
      return input;
    }
    classificationsIsNone(classifications) {
      if (classifications.length === 1) {
        return false;
      }
      if (classifications.length === 0 || classifications[0].score === 0) {
        return true;
      }
      return classifications[0].score === classifications[1].score;
    }
    checkIfIsNone(srcInput) {
      const input = srcInput;
      if (this.classificationsIsNone(input.classifications)) {
        input.intent = "None";
        input.score = 1;
      }
      return input;
    }
    async innerClassify(srcInput) {
      const input = srcInput;
      const domain = this.domainManagers[input.localeIso2];
      if (!domain) {
        input.classifications = [];
        input.domain = void 0;
        input.intent = void 0;
        input.score = void 0;
        return input;
      }
      const classifications = await domain.process(srcInput);
      input.classifications = classifications.classifications.sort(
        (a, b) => b.score - a.score
      );
      if (input.classifications.length === 0) {
        input.classifications.push({ intent: "None", score: 1 });
      }
      input.intent = input.classifications[0].intent;
      input.score = input.classifications[0].score;
      if (input.intent === "None") {
        classifications.domain = "default";
      } else if (classifications.domain === "default") {
        input.domain = this.getIntentDomain(input.locale, input.intent);
      } else {
        input.domain = classifications.domain;
      }
      return input;
    }
    async defaultPipelineProcess(input) {
      let output = await this.fillLanguage(input);
      output = await this.innerClassify(output);
      output = await this.checkIfIsNone(output);
      delete output.settings;
      delete output.classification;
      return output;
    }
    process(locale, utterance, domain, settings) {
      const input = typeof locale === "object" ? locale : {
        locale: utterance === void 0 ? void 0 : locale,
        utterance: utterance === void 0 ? locale : utterance,
        domain,
        settings: settings || this.settings
      };
      if (this.pipelineProcess) {
        return this.runPipeline(input, this.pipelineProcess);
      }
      return this.defaultPipelineProcess(input);
    }
    toJSON() {
      const result = {
        settings: this.settings,
        locales: this.locales,
        languageNames: this.languageNames,
        domainManagers: {},
        intentDomains: this.intentDomains,
        extraSentences: this.guesser.extraSentences.slice(0)
      };
      delete result.settings.container;
      const keys = Object.keys(this.domainManagers);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        result.domainManagers[key] = this.domainManagers[key].toJSON();
      }
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      for (let i = 0; i < json.locales.length; i += 1) {
        this.addLanguage(json.locales[i]);
      }
      this.languageNames = json.languageNames;
      this.intentDomains = json.intentDomains;
      const keys = Object.keys(json.domainManagers);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        this.domainManagers[key].fromJSON(json.domainManagers[key]);
      }
      for (let i = 0; i < json.extraSentences.length; i += 1) {
        const sentence = json.extraSentences[i];
        this.guesser.addExtraSentence(sentence[0], sentence[1]);
      }
    }
  }
  nluManager = NluManager;
  return nluManager;
}
var src$5;
var hasRequiredSrc$5;
function requireSrc$5() {
  if (hasRequiredSrc$5) return src$5;
  hasRequiredSrc$5 = 1;
  const Nlu = requireNlu();
  const NluNeural = requireNluNeural();
  const DomainManager = requireDomainManager();
  const NluManager = requireNluManager();
  src$5 = {
    Nlu,
    NluNeural,
    DomainManager,
    NluManager
  };
  return src$5;
}
var trimTypes;
var hasRequiredTrimTypes;
function requireTrimTypes() {
  if (hasRequiredTrimTypes) return trimTypes;
  hasRequiredTrimTypes = 1;
  const TrimType = {
    Between: "between",
    After: "after",
    AfterLast: "afterLast",
    AfterFirst: "afterFirst",
    Before: "before",
    BeforeFirst: "beforeFirst",
    BeforeLast: "beforeLast"
  };
  const TrimTypesList = Object.values(TrimType);
  trimTypes = {
    TrimType,
    TrimTypesList
  };
  return trimTypes;
}
var reduceEdges_1;
var hasRequiredReduceEdges;
function requireReduceEdges() {
  if (hasRequiredReduceEdges) return reduceEdges_1;
  hasRequiredReduceEdges = 1;
  const { TrimTypesList } = requireTrimTypes();
  function runDiscard(srcEdge, srcOther, useMaxLength, intentEntities = []) {
    let edge;
    let other;
    if (srcEdge.accuracy > srcOther.accuracy || srcEdge.accuracy === srcOther.accuracy && srcEdge.length > srcOther.length) {
      edge = srcEdge;
      other = srcOther;
    } else {
      edge = srcOther;
      other = srcEdge;
    }
    if (other.start <= edge.end && other.end >= edge.start) {
      if (other.accuracy < edge.accuracy) {
        other.discarded = true;
      } else if ((useMaxLength || other.entity === edge.entity || other.entity === "number") && other.len <= edge.len) {
        if (other.start === edge.start && other.end === edge.end && other.type === edge.type && other.entity === edge.entity && other.option === edge.option) {
          other.discarded = true;
        } else if (other.start === edge.start && other.end === edge.end && other.entity === edge.entity && other.type !== edge.type) {
          if (edge.type === "trim" && other.type !== "trim") {
            edge.discarded = true;
          } else if (edge.type !== "trim" && other.type === "trim") {
            other.discarded = true;
          } else {
            other.discarded = true;
          }
        }
      } else if ((useMaxLength || other.entity === edge.entity || edge.entity === "number") && other.len > edge.len) {
        edge.discarded = true;
      } else if (edge.type === "enum" && other.type === "enum") {
        const edgeIncludedInIntentEntities = intentEntities.includes(edge.entity);
        const otherIncludedInIntentEntities = intentEntities.includes(
          other.entity
        );
        if (edgeIncludedInIntentEntities && !otherIncludedInIntentEntities) {
          other.discarded = true;
        } else if (!edgeIncludedInIntentEntities && otherIncludedInIntentEntities) {
          edge.discarded = true;
        } else if (edge.len <= other.len && other.utteranceText.includes(edge.utteranceText)) {
          edge.discarded = true;
        } else if (edge.len > other.len && edge.utteranceText.includes(other.utteranceText)) {
          other.discarded = true;
        }
      }
    }
  }
  function splitEdges(edges) {
    for (let i = 0, l = edges.length; i < l; i += 1) {
      const edge = edges[i];
      if (edge.type === "trim" && TrimTypesList.includes(edge.subtype)) {
        for (let j = 0; j < edges.length; j += 1) {
          const other = edges[j];
          if (i !== j && other.start >= edge.start && other.end <= edge.end && other.type !== "trim") {
            const edgeLen = edge.end - edge.start;
            const otherLen = other.end - other.start;
            if (edge.end === other.end) {
              const text = edge.sourceText.substring(0, edgeLen - otherLen - 1);
              edge.sourceText = text;
              edge.utteranceText = text;
              edge.end = other.start - 1;
              edge.len = text.length;
            } else if (edge.start === other.start) {
              const text = edge.sourceText.substring(otherLen + 1);
              edge.sourceText = text;
              edge.utteranceText = text;
              edge.start = other.end + 1;
              edge.len = text.length;
            }
          }
        }
      }
    }
    return edges;
  }
  function reduceEdges(edges, useMaxLength = true, intentEntities = []) {
    edges = splitEdges(edges);
    const edgeslen = edges.length;
    for (let i = 0; i < edgeslen; i += 1) {
      const edge = edges[i];
      if (edge.len === 0) {
        edge.discarded = true;
      }
      if (!edge.discarded) {
        for (let j = i + 1; j < edgeslen; j += 1) {
          const other = edges[j];
          if (!other.discarded) {
            runDiscard(edge, other, useMaxLength, intentEntities);
          }
          if (edge.discarded) {
            break;
          }
        }
      }
      if (!edge.discarded) {
        const knownEntityPos = intentEntities.indexOf(edge.entity);
        if (knownEntityPos !== -1) {
          intentEntities.splice(knownEntityPos, 1);
        }
      }
    }
    return edges.filter((x) => !x.discarded);
  }
  reduceEdges_1 = reduceEdges;
  return reduceEdges_1;
}
var extractorEnum;
var hasRequiredExtractorEnum;
function requireExtractorEnum() {
  if (hasRequiredExtractorEnum) return extractorEnum;
  hasRequiredExtractorEnum = 1;
  const { defaultContainer } = requireSrc$9();
  const { Language } = requireSrc$6();
  const { similarity } = requireSrc$8();
  const reduceEdges = requireReduceEdges();
  class ExtractorEnum {
    constructor(container = defaultContainer) {
      this.container = container.container || container;
      this.name = "extract-enum";
    }
    getScripts(str) {
      const result = [];
      const chars = str.split("");
      for (let i = 0; i < chars.length; i += 1) {
        result.push(Language.getTopScript(chars[i]));
      }
      return result;
    }
    isAlphanumeric(c) {
      return /[\u00C0-\u1FFF\u2C00-\uD7FF\w]/.test(c) && c !== "_";
    }
    getWordPositions(str) {
      const scripts = this.getScripts(str);
      let atWhiteSpace = true;
      let lastIndex = 0;
      let currentIndex = 0;
      const strlen = str.length;
      const result = [];
      while (currentIndex < strlen) {
        if (this.isAlphanumeric(str.charAt(currentIndex))) {
          if (atWhiteSpace) {
            if (scripts[currentIndex][0] === "cmn") {
              result.push({
                start: currentIndex,
                end: currentIndex,
                len: 1
              });
              lastIndex = currentIndex;
            } else {
              lastIndex = currentIndex;
              atWhiteSpace = false;
            }
          }
        } else if (!atWhiteSpace) {
          result.push({
            start: lastIndex,
            end: currentIndex - 1,
            len: currentIndex - lastIndex
          });
          atWhiteSpace = true;
        }
        currentIndex += 1;
      }
      if (!atWhiteSpace) {
        result.push({
          start: lastIndex,
          end: currentIndex - 1,
          len: currentIndex - lastIndex
        });
      }
      return result;
    }
    getBestSubstring(str1, str2, words1) {
      const str1len = str1.length;
      const str2len = str2.length;
      if (str1len <= str2len) {
        const result = {
          start: 0,
          end: str1len - 1,
          len: str1len,
          levenshtein: similarity(str1, str2, true)
        };
        result.accuracy = (str2len - result.levenshtein) / str2len;
        return result;
      }
      const wordPositions = words1 || this.getWordPositions(str1);
      const wordPositionsLen = wordPositions.length;
      const best = {
        start: 0,
        end: 0,
        len: 0,
        levenshtein: void 0,
        accuracy: 0
      };
      for (let i = 0; i < wordPositionsLen; i += 1) {
        for (let j = i; j < wordPositionsLen; j += 1) {
          const str3 = str1.substring(
            wordPositions[i].start,
            wordPositions[j].end + 1
          );
          const levenshtein = similarity(str3, str2, true);
          if (best.levenshtein === void 0 || levenshtein < best.levenshtein) {
            best.levenshtein = levenshtein;
            best.start = wordPositions[i].start;
            best.end = wordPositions[j].end;
            best.len = best.end - best.start + 1;
          }
        }
      }
      best.accuracy = (str2len - best.levenshtein) / str2len;
      return best;
    }
    getBestSubstringList(str1, str2, words1, threshold = 1) {
      const str1len = str1.length;
      const str2len = str2.length;
      const result = [];
      if (str1len <= str2len) {
        const levenshtein = similarity(str1, str2, true);
        const accuracy = (str2len - levenshtein) / str2len;
        if (accuracy >= threshold) {
          result.push({
            start: 0,
            end: str1len - 1,
            len: str1len,
            levenshtein,
            accuracy
          });
        }
        return result;
      }
      const maxLevenshtein = str2len * (1 - threshold);
      const wordPositions = words1 || this.getWordPositions(str1);
      const wordPositionsLen = wordPositions.length;
      for (let i = 0; i < wordPositionsLen; i += 1) {
        for (let j = i; j < wordPositionsLen; j += 1) {
          const str3 = str1.substring(
            wordPositions[i].start,
            wordPositions[j].end + 1
          );
          const levenshtein = similarity(str3, str2, true);
          const accuracy = (str2len - levenshtein) / str2len;
          if (accuracy >= threshold) {
            result.push({
              start: wordPositions[i].start,
              end: wordPositions[j].end,
              len: wordPositions[j].end - wordPositions[i].start + 1,
              levenshtein,
              accuracy
            });
          }
          if (str3.length - wordPositions[0].len >= str2.length + maxLevenshtein) {
            break;
          }
        }
      }
      return result;
    }
    getRules(input) {
      const allRules = input.nerRules;
      if (!allRules) {
        return [];
      }
      return allRules;
    }
    normalize(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    buildRuleDict(rule) {
      const dict = {};
      const inverse = {};
      for (let i = 0; i < rule.rules.length; i += 1) {
        const current = rule.rules[i];
        for (let j = 0; j < current.texts.length; j += 1) {
          const source = current.texts[j];
          const key = this.normalize(current.texts[j]);
          if (!dict[key]) {
            dict[key] = [];
          }
          dict[key].push(current);
          inverse[key] = source;
        }
      }
      rule.dict = dict;
      rule.inverseDict = inverse;
    }
    getBestExact(srcText, words, rule) {
      const text = this.normalize(srcText);
      const wordPositions = words || this.getWordPositions(text);
      const wordPositionsLen = wordPositions.length;
      const result = [];
      for (let i = 0; i < wordPositionsLen; i += 1) {
        for (let j = i; j < wordPositionsLen; j += 1) {
          const str = text.substring(
            wordPositions[i].start,
            wordPositions[j].end + 1
          );
          if (rule.dict[str]) {
            const subrule = rule.dict[str];
            for (let k = 0; k < subrule.length; k += 1) {
              result.push({
                accuracy: 1,
                start: wordPositions[i].start,
                end: wordPositions[j].end,
                len: wordPositions[j].end - wordPositions[i].start + 1,
                levenshtein: 0,
                entity: rule.name,
                type: rule.type,
                option: subrule[k].option,
                sourceText: rule.inverseDict[str],
                utteranceText: srcText.substring(
                  wordPositions[i].start,
                  wordPositions[j].end + 1
                )
              });
            }
          }
        }
      }
      return result;
    }
    extractFromRule(text, rule, words, threshold) {
      if (rule.type === "enum") {
        const edges = [];
        if (threshold >= 1) {
          if (!rule.dict) {
            this.buildRuleDict(rule);
          }
          const newEdges = this.getBestExact(text, words, rule);
          for (let i = 0; i < newEdges.length; i += 1) {
            edges.push(newEdges[i]);
          }
        } else {
          for (let i = 0; i < rule.rules.length; i += 1) {
            const current = rule.rules[i];
            if (current && current.option && Array.isArray(current.texts)) {
              for (let j = 0; j < current.texts.length; j += 1) {
                const newEdges = this.getBestSubstringList(
                  text,
                  current.texts[j],
                  words,
                  current.threshold || threshold
                );
                for (let k = 0; k < newEdges.length; k += 1) {
                  edges.push({
                    ...newEdges[k],
                    entity: rule.name,
                    type: rule.type,
                    option: rule.rules[i].option,
                    sourceText: current.texts[j],
                    utteranceText: text.substring(
                      newEdges[k].start,
                      newEdges[k].end + 1
                    )
                  });
                }
              }
            }
          }
        }
        return edges;
      }
      return [];
    }
    async extract(srcInput) {
      const input = srcInput;
      const originalInputText = input.text || input.utterance;
      let tokenizedText = originalInputText;
      const originalPositionMap = [];
      const tokenizer = this.container.get("tokenize");
      if (tokenizer) {
        const tokenizeResult = await tokenizer.run({
          locale: input.locale,
          text: tokenizedText
        });
        tokenizedText = tokenizeResult.tokens.join(" ");
        if (tokenizedText !== originalInputText) {
          let originalTextIndex = 0;
          let tokenizedTextIndex = 0;
          for (let i = 0; i < tokenizeResult.tokens.length; i += 1) {
            const originaltextPos = originalInputText.indexOf(
              tokenizeResult.tokens[i],
              originalTextIndex
            );
            for (let idx = 0; idx < tokenizeResult.tokens[i].length; idx += 1) {
              originalPositionMap[tokenizedTextIndex + idx] = originaltextPos + idx;
            }
            originalTextIndex += tokenizeResult.tokens[i].length;
            tokenizedTextIndex += tokenizeResult.tokens[i].length + 1;
          }
        }
      }
      const wordPositions = this.getWordPositions(tokenizedText);
      const rules = this.getRules(input);
      const edges = input.edges || [];
      for (let i = 0; i < rules.length; i += 1) {
        const newEdges = this.extractFromRule(
          tokenizedText,
          rules[i],
          wordPositions,
          input.threshold || 0.8
        );
        for (let j = 0; j < newEdges.length; j += 1) {
          edges.push(newEdges[j]);
        }
      }
      if (originalPositionMap.length > 0) {
        for (let i = 0; i < edges.length; i += 1) {
          const edge = edges[i];
          edge.start = originalPositionMap[edge.start];
          edge.end = originalPositionMap[edge.end];
        }
      }
      edges.sort((a, b) => a.start - b.start);
      input.edges = reduceEdges(edges, false, input.intentEntities);
      return input;
    }
    run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      const extractor = this.container.get(`extract-enum-${locale}`) || this;
      return extractor.extract(input);
    }
  }
  extractorEnum = ExtractorEnum;
  return extractorEnum;
}
var extractorRegex;
var hasRequiredExtractorRegex;
function requireExtractorRegex() {
  if (hasRequiredExtractorRegex) return extractorRegex;
  hasRequiredExtractorRegex = 1;
  const { defaultContainer } = requireSrc$9();
  const reduceEdges = requireReduceEdges();
  class ExtractorRegex {
    constructor(container = defaultContainer) {
      this.container = container.container || container;
      this.name = "extract-regex";
    }
    getRules(input) {
      const allRules = input.nerRules;
      if (!allRules) {
        return [];
      }
      return allRules;
    }
    getMatchs(utterance, regex) {
      const result = [];
      let matchFound;
      do {
        const match = regex instanceof RegExp ? regex.exec(utterance) : null;
        if (match) {
          if (match.length === 1) {
            result.push({
              start: match.index,
              end: regex.lastIndex - 1,
              accuracy: 1,
              sourceText: match[0]
            });
          } else {
            const index2 = utterance.indexOf(match[1]);
            result.push({
              start: index2,
              end: index2 + match[1].length - 1,
              accuracy: 1,
              sourceText: match[1]
            });
          }
          matchFound = true;
        } else {
          matchFound = false;
        }
      } while (matchFound);
      return result;
    }
    extractFromRule(text, rule) {
      const edges = [];
      for (let i = 0; i < rule.rules.length; i += 1) {
        const newEdges = this.getMatchs(text, rule.rules[i]);
        for (let j = 0; j < newEdges.length; j += 1) {
          const edge = newEdges[j];
          edge.entity = rule.name;
          edge.type = rule.type;
          edge.utteranceText = text.substring(edge.start, edge.end + 1);
          edge.len = edge.utteranceText.length;
          edges.push(edge);
        }
      }
      return edges;
    }
    extract(srcInput) {
      const input = srcInput;
      const rules = this.getRules(input);
      const edges = input.edges || [];
      for (let i = 0; i < rules.length; i += 1) {
        const newEdges = this.extractFromRule(
          input.text || input.utterance,
          rules[i]
        );
        for (let j = 0; j < newEdges.length; j += 1) {
          edges.push(newEdges[j]);
        }
      }
      edges.sort((a, b) => a.start - b.start);
      input.edges = reduceEdges(edges, false);
      return input;
    }
    run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      const extractor = this.container.get(`extract-regex-${locale}`) || this;
      return extractor.extract(input);
    }
  }
  extractorRegex = ExtractorRegex;
  return extractorRegex;
}
var extractorTrim;
var hasRequiredExtractorTrim;
function requireExtractorTrim() {
  if (hasRequiredExtractorTrim) return extractorTrim;
  hasRequiredExtractorTrim = 1;
  const { defaultContainer } = requireSrc$9();
  const reduceEdges = requireReduceEdges();
  const { TrimType } = requireTrimTypes();
  class ExtractorTrim {
    constructor(container = defaultContainer) {
      this.container = container.container || container;
      this.name = "extract-trim";
    }
    mustSkip(word, condition) {
      if (condition.options && condition.options.skip && condition.options.skip.length > 0) {
        for (let i = 0; i < condition.options.skip.length; i += 1) {
          const skipWord = condition.options.skip[i];
          if (condition.options.caseSensitive) {
            if (skipWord === word) {
              return true;
            }
          } else if (skipWord.toLowerCase() === word.toLowerCase()) {
            return true;
          }
        }
      }
      return false;
    }
    matchBetween(utterance, condition, name) {
      const result = [];
      let matchFound;
      do {
        const match = condition.regex.exec(` ${utterance} `);
        if (match) {
          let matchIndex;
          let startIndex;
          let endIndex;
          if (condition && condition.options && condition.options.closest) {
            matchIndex = 1;
            if (!match[matchIndex]) {
              matchFound = false;
              break;
            }
            const leftWordIndex = match[0].indexOf(match[matchIndex]);
            startIndex = match.index - 1 + leftWordIndex;
            endIndex = startIndex + match[matchIndex].length - 1;
          } else {
            matchIndex = 0;
            startIndex = match.index - 1;
            endIndex = condition.regex.lastIndex - 2;
          }
          result.push({
            type: "trim",
            subtype: TrimType.Between,
            start: startIndex,
            end: endIndex,
            len: match[matchIndex].length,
            accuracy: 1,
            sourceText: match[matchIndex],
            utteranceText: match[matchIndex],
            entity: name
          });
          matchFound = true;
        } else {
          matchFound = false;
        }
      } while (matchFound);
      const filteredResult = [];
      for (let i = 0; i < result.length; i += 1) {
        if (!this.mustSkip(result[i].utteranceText, condition)) {
          filteredResult.push(result[i]);
        }
      }
      return filteredResult;
    }
    findWord(utterance, word, caseSensitive = false, noSpaces = false) {
      const result = [];
      let matchFound;
      const regex = new RegExp(
        noSpaces ? word : ` ${word} | ${word}|${word} `,
        caseSensitive ? "g" : "ig"
      );
      do {
        const match = regex.exec(utterance);
        if (match) {
          result.push({
            start: match.index,
            end: regex.lastIndex
          });
          matchFound = true;
        } else {
          matchFound = false;
        }
      } while (matchFound);
      return result;
    }
    getBeforeResults(utterance, wordPositions, name) {
      const result = [];
      let startPos = 0;
      let endPos = 0;
      for (let i = 0; i < wordPositions.length; i += 1) {
        endPos = wordPositions[i].start;
        const text = utterance.substring(startPos, endPos);
        result.push({
          type: "trim",
          subtype: TrimType.Before,
          start: startPos,
          end: endPos - 1,
          len: text.length,
          accuracy: 0.99,
          sourceText: text,
          utteranceText: text,
          entity: name
        });
        startPos = wordPositions[i].end;
      }
      return result;
    }
    getBeforeFirstResults(utterance, wordPositions, name) {
      const result = [];
      const startPos = 0;
      const endPos = wordPositions[0].start;
      const text = utterance.substring(startPos, endPos);
      result.push({
        type: "trim",
        subtype: TrimType.BeforeFirst,
        start: startPos,
        end: endPos - 1,
        len: text.length,
        accuracy: 0.99,
        sourceText: text,
        utteranceText: text,
        entity: name
      });
      return result;
    }
    getBeforeLastResults(utterance, wordPositions, name) {
      const result = [];
      const startPos = 0;
      const endPos = wordPositions[wordPositions.length - 1].start;
      const text = utterance.substring(startPos, endPos);
      result.push({
        type: "trim",
        subtype: TrimType.BeforeLast,
        start: startPos,
        end: endPos - 1,
        len: text.length,
        accuracy: 0.99,
        sourceText: text,
        utteranceText: text,
        entity: name
      });
      return result;
    }
    getAfterResults(utterance, wordPositions, name) {
      const result = [];
      let startPos = 0;
      let endPos = utterance.length;
      for (let i = wordPositions.length - 1; i >= 0; i -= 1) {
        startPos = wordPositions[i].end;
        const text = utterance.substring(startPos, endPos);
        result.unshift({
          type: "trim",
          subtype: TrimType.After,
          start: startPos,
          end: endPos - 1,
          len: text.length,
          accuracy: 0.99,
          sourceText: text,
          utteranceText: text,
          entity: name
        });
        endPos = wordPositions[i].start;
      }
      return result;
    }
    getAfterFirstResults(utterance, wordPositions, name) {
      const result = [];
      const startPos = wordPositions[0].end;
      const endPos = utterance.length;
      const text = utterance.substring(startPos, endPos);
      result.push({
        type: "trim",
        subtype: TrimType.AfterFirst,
        start: startPos,
        end: endPos - 1,
        len: text.length,
        accuracy: 0.99,
        sourceText: text,
        utteranceText: text,
        entity: name
      });
      return result;
    }
    getAfterLastResults(utterance, wordPositions, name) {
      const result = [];
      const startPos = wordPositions[wordPositions.length - 1].end;
      const endPos = utterance.length;
      const text = utterance.substring(startPos, endPos);
      result.push({
        type: "trim",
        subtype: TrimType.AfterLast,
        start: startPos,
        end: endPos - 1,
        len: text.length,
        accuracy: 0.99,
        sourceText: text,
        utteranceText: text,
        entity: name
      });
      return result;
    }
    getResults(utterance, wordPositions, type, name) {
      switch (type) {
        case TrimType.Before:
          return this.getBeforeResults(utterance, wordPositions, name);
        case TrimType.BeforeFirst:
          return this.getBeforeFirstResults(utterance, wordPositions, name);
        case TrimType.BeforeLast:
          return this.getBeforeLastResults(utterance, wordPositions, name);
        case TrimType.After:
          return this.getAfterResults(utterance, wordPositions, name);
        case TrimType.AfterFirst:
          return this.getAfterFirstResults(utterance, wordPositions, name);
        case TrimType.AfterLast:
          return this.getAfterLastResults(utterance, wordPositions, name);
        default:
          return [];
      }
    }
    match(utterance, condition, type, name) {
      const result = [];
      if (condition && Array.isArray(condition.words)) {
        for (let i = 0; i < condition.words.length; i += 1) {
          const word = condition.options.noSpaces ? condition.words[i] : ` ${condition.words[i]}`;
          const wordPositions = this.findWord(utterance, word);
          if (!condition.options.noSpaces) {
            const wordPositions2 = this.findWord(utterance, condition.words[i]);
            if (wordPositions2.length > 0 && wordPositions2[0].start === 0) {
              wordPositions.unshift(wordPositions2[0]);
            }
          }
          if (wordPositions.length > 0) {
            result.push(...this.getResults(utterance, wordPositions, type, name));
          }
        }
      }
      const filteredResult = [];
      for (let i = 0; i < result.length; i += 1) {
        result[i].sourceText = result[i].sourceText.replace(
          /^[\s,.!?;:([\]'"¡¿)/]+|[\s,.!?;:([\]'"¡¿)/]+$/,
          ""
        );
        if (!this.mustSkip(result[i].utteranceText, condition)) {
          filteredResult.push(result[i]);
        }
      }
      return filteredResult;
    }
    getRules(input) {
      const allRules = input.nerRules;
      if (!allRules) {
        return [];
      }
      return allRules;
    }
    extractFromRule(utterance, rule) {
      const edges = [];
      for (let i = 0; i < rule.rules.length; i += 1) {
        const current = rule.rules[i];
        if (current.type === TrimType.Between) {
          edges.push(...this.matchBetween(utterance, current, rule.name));
        } else {
          edges.push(...this.match(utterance, current, current.type, rule.name));
        }
      }
      return edges;
    }
    extract(srcInput) {
      const input = srcInput;
      const rules = this.getRules(input);
      const edges = input.edges || [];
      for (let i = 0; i < rules.length; i += 1) {
        const newEdges = this.extractFromRule(
          input.text || input.utterance,
          rules[i]
        );
        for (let j = 0; j < newEdges.length; j += 1) {
          edges.push(newEdges[j]);
        }
      }
      edges.sort((a, b) => a.start - b.start);
      input.edges = reduceEdges(edges, false);
      return input;
    }
    run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      const extractor = this.container.get(`extract-trim-${locale}`) || this;
      return extractor.extract(input);
    }
  }
  extractorTrim = ExtractorTrim;
  return extractorTrim;
}
var extractorBuiltin;
var hasRequiredExtractorBuiltin;
function requireExtractorBuiltin() {
  if (hasRequiredExtractorBuiltin) return extractorBuiltin;
  hasRequiredExtractorBuiltin = 1;
  const { defaultContainer } = requireSrc$9();
  const reduceEdges = requireReduceEdges();
  class ExtractorBuiltin {
    constructor(container = defaultContainer) {
      this.container = container.container || container;
      this.name = "extract-builtin";
    }
    extract(srcInput) {
      return srcInput;
    }
    async run(srcInput) {
      const input = srcInput;
      const locale = input.locale || "en";
      const extractor = this.container.get(`extract-builtin-${locale}`) || this;
      const newInput = await extractor.extract({
        text: input.text || input.utterance,
        locale: input.locale
      });
      input.edges = input.edges || [];
      if (newInput.edges) {
        for (let i = 0; i < newInput.edges.length; i += 1) {
          if (!input.nerLimitToEntities || input.intentEntities.includes(newInput.edges[i].entity)) {
            input.edges.push(newInput.edges[i]);
          }
        }
      }
      input.edges = reduceEdges(input.edges, false);
      input.sourceEntities = input.sourceEntities || [];
      if (newInput.sourceEntities) {
        for (let i = 0; i < newInput.sourceEntities.length; i += 1) {
          input.sourceEntities.push(newInput.sourceEntities[i]);
        }
      }
      return input;
    }
  }
  extractorBuiltin = ExtractorBuiltin;
  return extractorBuiltin;
}
var ner;
var hasRequiredNer;
function requireNer() {
  if (hasRequiredNer) return ner;
  hasRequiredNer = 1;
  const { Clonable } = requireSrc$9();
  const ExtractorEnum = requireExtractorEnum();
  const ExtractorRegex = requireExtractorRegex();
  const ExtractorTrim = requireExtractorTrim();
  const ExtractorBuiltin = requireExtractorBuiltin();
  const { TrimType } = requireTrimTypes();
  function isObject(obj) {
    return obj !== void 0 && obj !== null && obj.constructor === Object;
  }
  class Ner extends Clonable {
    constructor(settings = {}, container = void 0) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      this.applySettings(this.settings);
      if (!this.settings.tag) {
        this.settings.tag = `ner`;
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.rules = {};
      this.applySettings(this, {
        pipelineProcess: this.getPipeline(`${this.settings.tag}-process`)
      });
    }
    registerDefault() {
    }
    getRulesByName(locale = "*", name = "", force = false) {
      if (!this.rules[locale]) {
        if (!force) {
          return void 0;
        }
        this.rules[locale] = {};
      }
      if (!this.rules[locale][name]) {
        if (!force) {
          return void 0;
        }
        this.rules[locale][name] = {
          name,
          type: "enum",
          rules: []
        };
      }
      return this.rules[locale][name];
    }
    addRule(locale = "*", name, type, rule) {
      if (Array.isArray(locale)) {
        for (let i = 0; i < locale.length; i += 1) {
          this.addRule(locale[i], name, type, rule);
        }
      } else {
        if (!this.rules[locale]) {
          this.rules[locale] = {};
        }
        if (!this.rules[locale][name]) {
          this.rules[locale][name] = {
            name,
            type,
            rules: []
          };
        }
        this.rules[locale][name].rules.push(rule);
      }
    }
    asString(item) {
      if (item) {
        if (isObject(item)) {
          return JSON.stringify(item);
        }
        if (item.toString) {
          return item.toString();
        }
      }
      return "";
    }
    findRule(rules, rule) {
      const str = this.asString(rule);
      for (let i = 0; i < rules.length; i += 1) {
        if (this.asString(rules[i]) === str) {
          return i;
        }
      }
      return -1;
    }
    removeRule(locale = "*", name, rule) {
      if (this.rules[locale]) {
        if (this.rules[locale][name]) {
          if (!rule) {
            delete this.rules[locale][name];
          } else {
            const index2 = this.findRule(this.rules[locale][name].rules, rule);
            if (index2 > -1) {
              this.rules[locale][name].rules.splice(index2, 1);
            }
          }
        }
      }
    }
    getRules(locale = "*") {
      const result = [];
      if (this.rules[locale]) {
        const keys = Object.keys(this.rules[locale]);
        for (let i = 0; i < keys.length; i += 1) {
          result.push(this.rules[locale][keys[i]]);
        }
      }
      if (locale !== "*" && this.rules["*"]) {
        const keys = Object.keys(this.rules["*"]);
        for (let i = 0; i < keys.length; i += 1) {
          result.push(this.rules["*"][keys[i]]);
        }
      }
      return result;
    }
    decideRules(srcInput, intentEntities) {
      const input = srcInput;
      let nerRules = this.getRules(input.locale || "en");
      if (intentEntities && this.settings.considerOnlyIntentEntities) {
        nerRules = nerRules.filter((rule) => intentEntities.includes(rule.name));
      } else if (intentEntities) {
        const intentRelevantRule = [];
        const nonIntentRelevantRule = [];
        nerRules.forEach((rule) => {
          if (intentEntities.includes(rule.name)) {
            intentRelevantRule.push(rule);
          } else {
            nonIntentRelevantRule.push(rule);
          }
        });
        nerRules = intentRelevantRule.concat(nonIntentRelevantRule);
      }
      input.nerRules = nerRules;
      input.nerLimitToEntities = this.settings.considerOnlyIntentEntities;
      input.intentEntities = intentEntities;
      return input;
    }
    getRuleOption(rules, option) {
      for (let i = 0; i < rules.length; i += 1) {
        if (rules[i].option === option) {
          return rules[i];
        }
      }
      return void 0;
    }
    addRuleOptionTexts(locale, name, option, srcTexts) {
      if (Array.isArray(locale)) {
        for (let i = 0; i < locale.length; i += 1) {
          this.addRuleOptionTexts(locale[i], name, option, srcTexts);
        }
      } else {
        let texts = srcTexts || option;
        if (!Array.isArray(texts)) {
          texts = [texts];
        }
        const rules = this.getRulesByName(locale, name, true);
        let ruleOption = this.getRuleOption(rules.rules, option);
        if (!ruleOption) {
          ruleOption = {
            option,
            texts
          };
          rules.rules.push(ruleOption);
        } else {
          const dict = {};
          for (let i = 0; i < ruleOption.texts.length; i += 1) {
            dict[ruleOption.texts[i]] = 1;
          }
          for (let i = 0; i < texts.length; i += 1) {
            dict[texts[i]] = 1;
          }
          ruleOption.texts = Object.keys(dict);
        }
      }
    }
    removeRuleOptionTexts(locale, name, option, srcTexts) {
      if (Array.isArray(locale)) {
        for (let i = 0; i < locale.length; i += 1) {
          this.removeRuleOptionTexts(locale[i], name, option, srcTexts);
        }
      } else {
        let texts = srcTexts || option;
        if (!Array.isArray(texts)) {
          texts = [texts];
        }
        const rules = this.getRulesByName(locale, name, false);
        if (rules) {
          const ruleOption = this.getRuleOption(rules.rules, option);
          if (ruleOption) {
            const dict = {};
            for (let i = 0; i < ruleOption.texts.length; i += 1) {
              dict[ruleOption.texts[i]] = 1;
            }
            for (let i = 0; i < texts.length; i += 1) {
              delete dict[texts[i]];
            }
            ruleOption.texts = Object.keys(dict);
          }
        }
      }
    }
    static str2regex(str) {
      const index2 = str.lastIndexOf("/");
      return new RegExp(str.slice(1, index2), str.slice(index2 + 1));
    }
    static regex2str(regex) {
      return regex.toString();
    }
    addRegexRule(locale, name, srcRegex) {
      const regex = typeof srcRegex === "string" ? Ner.str2regex(srcRegex) : srcRegex;
      const globalFlag = "g";
      const fixedRegex = regex.flags.includes(globalFlag) ? regex : new RegExp(regex.source, `${regex.flags}${globalFlag}`);
      this.addRule(locale, name, "regex", fixedRegex);
    }
    addBetweenLastCondition(locale, name, srcLeftWords, srcRightWords, srcOptions = {}) {
      const options = {
        ...srcOptions,
        closest: true
      };
      this.addBetweenCondition(
        locale,
        name,
        srcLeftWords,
        srcRightWords,
        options
      );
    }
    addBetweenCondition(locale, name, srcLeftWords, srcRightWords, srcOptions) {
      const options = srcOptions || {};
      const leftWords = Array.isArray(srcLeftWords) ? srcLeftWords : [srcLeftWords];
      const rightWords = Array.isArray(srcRightWords) ? srcRightWords : [srcRightWords];
      const conditions = [];
      for (let i = 0; i < leftWords.length; i += 1) {
        for (let j = 0; j < rightWords.length; j += 1) {
          const leftWord = options.noSpaces === true ? leftWords[i] : ` ${leftWords[i]} `;
          const rightWord = options.noSpaces === true ? rightWords[j] : ` ${rightWords[j]} `;
          let regex2;
          if (options.closest === true) {
            regex2 = `${leftWord}(?!.*${leftWord}.*)(.*)${rightWord}`;
          } else {
            regex2 = `(?<=${leftWord})(.*)(?=${rightWord})`;
          }
          conditions.push(regex2);
        }
      }
      let regex = `/${conditions.join("|")}/g`;
      if (options.caseSensitive !== true) {
        regex += "i";
      }
      const rule = {
        type: "between",
        leftWords,
        rightWords,
        regex: Ner.str2regex(regex),
        options
      };
      this.addRule(locale, name, "trim", rule);
    }
    addPositionCondition(locale, name, position, srcWords, srcOptions) {
      const options = srcOptions || {};
      const words = Array.isArray(srcWords) ? srcWords : [srcWords];
      const rule = {
        type: position,
        words,
        options
      };
      this.addRule(locale, name, "trim", rule);
    }
    addAfterCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.After, words, opts);
    }
    addAfterFirstCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.AfterFirst, words, opts);
    }
    addAfterLastCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.AfterLast, words, opts);
    }
    addBeforeCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.Before, words, opts);
    }
    addBeforeFirstCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.BeforeFirst, words, opts);
    }
    addBeforeLastCondition(locale, name, words, opts) {
      this.addPositionCondition(locale, name, TrimType.BeforeLast, words, opts);
    }
    reduceEdges(input) {
      input.entities = input.edges;
      delete input.edges;
      delete input.nerRules;
      delete input.nerLimitToEntities;
      delete input.intentEntities;
      return input;
    }
    async defaultPipelineProcess(input, intentEntities) {
      if (!this.cache) {
        this.cache = {
          extractEnum: this.container.get("extract-enum"),
          extractRegex: this.container.get("extract-regex"),
          extractTrim: this.container.get("extract-trim"),
          extractBuiltin: this.container.get("extract-builtin")
        };
        if (!this.cache.extractEnum) {
          this.container.use(ExtractorEnum);
          this.cache.extractEnum = this.container.get("extract-enum");
        }
        if (!this.cache.extractRegex) {
          this.container.use(ExtractorRegex);
          this.cache.extractRegex = this.container.get("extract-regex");
        }
        if (!this.cache.extractTrim) {
          this.container.use(ExtractorTrim);
          this.cache.extractTrim = this.container.get("extract-trim");
        }
        if (!this.cache.extractBuiltin) {
          this.container.use(ExtractorBuiltin);
          this.cache.extractBuiltin = this.container.get("extract-builtin");
        }
      }
      let output = await this.decideRules(input, intentEntities);
      if (this.cache.extractEnum) {
        output = await this.cache.extractEnum.run(output);
      }
      if (this.cache.extractRegex) {
        output = await this.cache.extractRegex.run(output);
      }
      if (this.cache.extractTrim) {
        output = await this.cache.extractTrim.run(output);
      }
      if (this.cache.extractBuiltin) {
        output = await this.cache.extractBuiltin.run(output);
      }
      output = await this.reduceEdges(output);
      return output;
    }
    async process(srcInput, consideredEntities) {
      const input = {
        threshold: this.settings.threshold || 0.8,
        ...srcInput
      };
      let result;
      if (input.locale) {
        const pipeline = this.container.getPipeline(
          `${this.settings.tag}-${input.locale}-process`
        );
        if (pipeline) {
          result = await this.runPipeline(input, pipeline);
        }
      } else if (this.pipelineProcess) {
        result = await this.runPipeline(input, this.pipelineProcess);
      }
      if (!result) {
        result = await this.defaultPipelineProcess(input, consideredEntities);
      } else if (consideredEntities) {
        result.entities = result.entities.filter(
          (entity) => consideredEntities.includes(entity.entity)
        );
      }
      delete result.threshold;
      return result;
    }
    nameToEntity(name) {
      const preffix = this.settings.entityPreffix === void 0 ? "@" : this.settings.entityPreffix;
      const suffix = this.settings.entitySuffix === void 0 ? "" : this.settings.entitySuffix;
      return `${preffix}${name}${suffix}`;
    }
    entityToName(entity) {
      if (!entity) {
        return entity;
      }
      let name = entity;
      const preffix = this.settings.entityPreffix === void 0 ? "@" : this.settings.entityPreffix;
      const suffix = this.settings.entitySuffix === void 0 ? "" : this.settings.entitySuffix;
      if (preffix) {
        if (!name.startsWith(preffix)) {
          return entity;
        }
        name = name.slice(preffix.length);
      }
      if (suffix) {
        if (!name.endsWith(suffix)) {
          return entity;
        }
        name = name.slice(0, -suffix.length);
      }
      return name;
    }
    isEntity(entity) {
      const name = this.entityToName(entity);
      return name !== entity;
    }
    getEntitiesFromUtterance(locale, utterance) {
      if (!utterance) {
        utterance = locale;
        locale = "es";
      }
      const tokens = utterance.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
      const result = [];
      for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];
        if (this.isEntity(token)) {
          result.push(this.entityToName(token));
        }
      }
      return result;
    }
    async generateEntityUtterance(locale, utterance) {
      let input = {
        locale,
        utterance
      };
      input = await this.process(input);
      const { entities } = input;
      if (!entities || !entities.length) {
        return utterance;
      }
      entities.sort((a, b) => a.start - b.start);
      let index2 = 0;
      let result = "";
      for (let i = 0; i < entities.length; i += 1) {
        const entity = entities[i];
        const left = utterance.slice(index2, entity.start);
        index2 = entity.end + 1;
        result += left;
        result += this.nameToEntity(entity.entity);
      }
      const right = utterance.slice(entities[entities.length - 1].end + 1);
      result += right;
      return result;
    }
    toJSON() {
      RegExp.prototype.toJSON = RegExp.prototype.toString;
      const result = {
        settings: { ...this.settings },
        rules: { ...this.rules }
      };
      delete result.settings.container;
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      const rulesKeys = Object.keys(json.rules);
      rulesKeys.forEach((rKey) => {
        const entityKeys = Object.keys(json.rules[rKey]);
        entityKeys.forEach((eKey) => {
          json.rules[rKey][eKey].rules = json.rules[rKey][eKey].type === "regex" ? json.rules[rKey][eKey].rules.map((rule) => Ner.str2regex(rule)) : json.rules[rKey][eKey].rules.map(
            (rule) => typeof rule.regex === "string" ? {
              ...rule,
              regex: Ner.str2regex(rule.regex)
            } : rule
          );
        });
      });
      this.rules = json.rules;
    }
  }
  ner = Ner;
  return ner;
}
var src$4;
var hasRequiredSrc$4;
function requireSrc$4() {
  if (hasRequiredSrc$4) return src$4;
  hasRequiredSrc$4 = 1;
  const Ner = requireNer();
  const ExtractorEnum = requireExtractorEnum();
  const ExtractorRegex = requireExtractorRegex();
  const ExtractorTrim = requireExtractorTrim();
  const ExtractorBuiltin = requireExtractorBuiltin();
  src$4 = {
    Ner,
    ExtractorEnum,
    ExtractorRegex,
    ExtractorTrim,
    ExtractorBuiltin
  };
  return src$4;
}
var nlgManager;
var hasRequiredNlgManager;
function requireNlgManager() {
  if (hasRequiredNlgManager) return nlgManager;
  hasRequiredNlgManager = 1;
  const { Clonable } = requireSrc$9();
  class NlgManager extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = "nlg-manager";
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.responses = {};
      this.applySettings(this, {
        pipelineFind: this.getPipeline(`${this.settings.tag}-find`)
      });
    }
    registerDefault() {
      this.container.registerConfiguration("nlg-manager", {}, false);
    }
    findAllAnswers(srcInput) {
      const input = srcInput;
      if (this.responses[input.locale]) {
        input.answers = this.responses[input.locale][input.intent] || [];
      } else {
        input.answers = [];
      }
      return input;
    }
    filterAnswers(srcInput) {
      const input = srcInput;
      const { answers } = input;
      if (answers && answers.length) {
        const evaluator = this.container.get("Evaluator");
        if (evaluator) {
          const context = input.context || {};
          const filtered = [];
          for (let i = 0; i < answers.length; i += 1) {
            const answer = answers[i];
            if (answer.opts) {
              const condition = typeof answer.opts === "string" ? answer.opts : answer.opts.condition;
              if (condition) {
                if (evaluator.evaluate(condition, context) === true) {
                  filtered.push(answer);
                }
              } else {
                filtered.push(answer);
              }
            } else {
              filtered.push(answer);
            }
          }
          input.answers = filtered;
        }
      }
      return input;
    }
    chooseRandom(srcInput) {
      const input = srcInput;
      const { answers } = input;
      if (answers && answers.length) {
        input.answer = answers[Math.floor(Math.random() * answers.length)].answer;
      }
      return input;
    }
    renderText(srcText, context) {
      if (!srcText) {
        return srcText;
      }
      let text = srcText.answer || srcText;
      let matchFound;
      do {
        const match = /\((?:[^()]+)\|(?:[^()]+)\)/g.exec(text);
        if (match) {
          for (let i = 0; i < match.length; i += 1) {
            const source = match[i];
            const options = source.substring(1, source.length - 1).split("|");
            text = text.replace(
              source,
              options[Math.floor(Math.random() * options.length)]
            );
          }
          matchFound = true;
        } else {
          matchFound = false;
        }
      } while (matchFound);
      if (srcText.answer) {
        srcText.answer = text;
      } else {
        srcText = text;
      }
      const template = this.container.get("Template");
      if (template && context) {
        return template.compile(srcText, context);
      }
      return srcText;
    }
    renderRandom(srcInput) {
      const input = srcInput;
      const { answers, context } = input;
      for (let i = 0; i < answers.length; i += 1) {
        answers[i] = this.renderText(answers[i], context);
      }
      return input;
    }
    indexOfAnswer(locale, intent, answer, opts) {
      if (!this.responses[locale]) {
        return -1;
      }
      if (!this.responses[locale][intent]) {
        return -1;
      }
      const potential = this.responses[locale][intent];
      for (let i = 0; i < potential.length; i += 1) {
        const response = potential[i];
        if (response.answer === answer && JSON.stringify(response.opts) === JSON.stringify(opts)) {
          return i;
        }
      }
      return -1;
    }
    add(locale, intent, answer, opts) {
      const index2 = this.indexOfAnswer(locale, intent, answer, opts);
      if (index2 !== -1) {
        return this.responses[locale][intent][index2];
      }
      if (!this.responses[locale]) {
        this.responses[locale] = {};
      }
      if (!this.responses[locale][intent]) {
        this.responses[locale][intent] = [];
      }
      const obj = { answer, opts };
      this.responses[locale][intent].push(obj);
      return obj;
    }
    remove(locale, intent, answer, opts) {
      const index2 = this.indexOfAnswer(locale, intent, answer, opts);
      if (index2 !== -1) {
        this.responses[locale][intent].splice(index2, 1);
      }
    }
    defaultPipelineFind(input) {
      let output = this.findAllAnswers(input);
      output = this.filterAnswers(output);
      output = this.renderRandom(output);
      output = this.chooseRandom(output);
      return output;
    }
    find(locale, intent, context, settings) {
      const input = {
        locale,
        intent,
        context,
        settings: settings || this.settings
      };
      if (this.pipelineFind) {
        return this.runPipeline(input, this.pipelineFind);
      }
      return this.defaultPipelineFind(input);
    }
    run(srcInput, settings) {
      return this.find(
        srcInput.locale,
        srcInput.intent,
        srcInput.context,
        settings
      );
    }
    toJSON() {
      const result = {
        settings: { ...this.settings },
        responses: this.responses
      };
      delete result.settings.container;
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      this.responses = json.responses;
    }
  }
  nlgManager = NlgManager;
  return nlgManager;
}
var actionManager;
var hasRequiredActionManager;
function requireActionManager() {
  if (hasRequiredActionManager) return actionManager;
  hasRequiredActionManager = 1;
  const { Clonable } = requireSrc$9();
  class ActionManager extends Clonable {
    /**
     * Constructor of the class
     */
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = "action-manager";
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.actions = {};
      this.actionsMap = {};
      this.applySettings(this, {
        pipelineFind: this.getPipeline(`${this.settings.tag}-find`)
      });
    }
    registerDefault() {
    }
    /**
     * Find the index of an action
     * @param {String} intent Name of the intent.
     * @param {String} action Name of the action.
     * @param {any[]} parameters list of parameters of the action.
     */
    posAction(intent, action, parameters) {
      if (!this.actions[intent]) {
        return -1;
      }
      const actions = this.actions[intent];
      for (let i = 0; i < actions.length; i += 1) {
        if (actions[i].action === action && JSON.stringify(actions[i].parameters) === JSON.stringify(parameters)) {
          return i;
        }
      }
      return -1;
    }
    /**
     * Return an array of actions for the intent.
     * @param {String} intent Name of the intent.
     * @returns {Object[]} Actions for this intent.
     */
    findActions(intent) {
      const dehydratedActions = this.actions[intent] || [];
      return dehydratedActions.map((actionBundle) => ({
        ...actionBundle,
        fn: this.actionsMap[actionBundle.action]
      }));
    }
    /**
     * Returns a processed answer after execute a list of given actions.
     * @param {String} intent Name of the intent.
     * @param {String|Object} input original answer data structure
     */
    async processActions(intent, input) {
      const actionList = this.findActions(intent);
      if (input && typeof input === "object") {
        input.actions = actionList.map((x) => ({
          action: x.action,
          parameters: x.parameters
        }));
      }
      let processedAnswer = input;
      for (const { fn, parameters } of actionList) {
        if (fn) {
          const newProcessedAnswer = await fn(
            processedAnswer,
            ...parameters || []
          );
          if (newProcessedAnswer) {
            if (typeof processedAnswer === "object") {
              if (typeof newProcessedAnswer === "object") {
                processedAnswer = newProcessedAnswer;
              } else {
                processedAnswer.answer = newProcessedAnswer;
              }
            } else {
              processedAnswer = newProcessedAnswer;
            }
          }
        }
      }
      return processedAnswer;
    }
    /**
     * Add an action to a given intent.
     * @param {String} intent Name of the intent.
     * @param {String} action Action to be executed
     * @param {any[]} parameters Parameters of the action
     * @param {function} [fn] Function of the action
     */
    addAction(intent, action, parameters, fn) {
      if (this.posAction(intent, action, parameters) === -1) {
        if (!this.actions[intent]) {
          this.actions[intent] = [];
        }
        this.actions[intent].push({ action, parameters });
        if (fn) {
          this.actionsMap[action] = fn;
        }
      }
    }
    /**
     * Remove an action.
     * @param {String} intent Name of the intent
     * @param {String} action Name of the action
     * @param {Object[]} parameters Parameters of the action.
     */
    removeAction(intent, action, parameters) {
      const index2 = this.posAction(intent, action, parameters);
      if (index2 > -1) {
        this.actions[intent].splice(index2, 1);
      }
    }
    /**
     * Remove all the actions of a given intent.
     * @param {String} intent Name of the intent.
     */
    removeActions(intent) {
      delete this.actions[intent];
    }
    /**
     * Registers/Sets a function for a given action
     * @param {String} action Name of the action.
     * @param {function} [fn] Function of the action
     */
    registerActionInMap(action, fn) {
      this.actionsMap[action] = fn;
    }
    /**
     * Remove an action function from the actions map.
     * @param {String} action Name of the action.
     */
    removeActionFromMap(action) {
      delete this.actionsMap[action];
    }
    run(srcInput, settings) {
      const input = srcInput;
      input.settings = input.settings || settings || this.settings;
      return this.processActions(srcInput.intent, input);
    }
    toJSON() {
      const result = {
        settings: { ...this.settings },
        actions: this.actions
      };
      delete result.settings.container;
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      this.actions = json.actions;
    }
  }
  actionManager = ActionManager;
  return actionManager;
}
var src$3;
var hasRequiredSrc$3;
function requireSrc$3() {
  if (hasRequiredSrc$3) return src$3;
  hasRequiredSrc$3 = 1;
  const NlgManager = requireNlgManager();
  const ActionManager = requireActionManager();
  src$3 = {
    NlgManager,
    ActionManager
  };
  return src$3;
}
var sentimentAnalyzer;
var hasRequiredSentimentAnalyzer;
function requireSentimentAnalyzer() {
  if (hasRequiredSentimentAnalyzer) return sentimentAnalyzer;
  hasRequiredSentimentAnalyzer = 1;
  const { Clonable } = requireSrc$9();
  class SentimentAnalyzer extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container
        },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = "sentiment-analyzer";
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.applySettings(this, {
        pipelinePrepare: this.getPipeline(`${this.settings.tag}-prepare`),
        pipelineProcess: this.getPipeline(`${this.settings.tag}-process`)
      });
    }
    registerDefault() {
      this.container.registerConfiguration("sentiment-analyzer", {}, false);
    }
    prepare(locale, text, settings, stemmed) {
      const pipeline = this.getPipeline(`${this.settings.tag}-prepare`);
      if (pipeline) {
        const input = {
          text,
          locale,
          settings: settings || this.settings
        };
        return this.runPipeline(input, pipeline);
      }
      if (stemmed) {
        const stemmer = this.container.get(`stemmer-${locale}`) || this.container.get(`stemmer-en`);
        if (stemmer) {
          return stemmer.tokenizeAndStem(text);
        }
      }
      const tokenizer = this.container.get(`tokenizer-${locale}`) || this.container.get(`tokenizer-en`);
      if (tokenizer) {
        return tokenizer.tokenize(text, true);
      }
      const normalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return normalized.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
    }
    async getDictionary(srcInput) {
      const input = srcInput;
      const dictionaries = this.container.get(`sentiment-${input.locale}`);
      let type;
      if (dictionaries) {
        if (dictionaries.senticon) {
          type = "senticon";
        } else if (dictionaries.pattern) {
          type = "pattern";
        } else if (dictionaries.afinn) {
          type = "afinn";
        }
      }
      if (!type) {
        input.sentimentDictionary = {
          type,
          dictionary: void 0,
          negations: [],
          stemmed: false
        };
        return input;
      }
      input.sentimentDictionary = {
        type,
        dictionary: dictionaries[type],
        negations: dictionaries.negations.words,
        stemmed: dictionaries.stemmed === void 0 ? false : dictionaries.stemmed
      };
      return input;
    }
    async getTokens(srcInput) {
      const input = srcInput;
      if (!input.tokens && input.sentimentDictionary.type) {
        input.tokens = await this.prepare(
          input.locale,
          input.utterance || input.text,
          input.settings,
          input.sentimentDictionary.stemmed
        );
      }
      return input;
    }
    calculate(srcInput) {
      const input = srcInput;
      if (input.sentimentDictionary.type) {
        const tokens = Array.isArray(input.tokens) ? input.tokens : Object.keys(input.tokens);
        if (!input.sentimentDictionary.dictionary) {
          input.sentiment = {
            score: 0,
            numWords: tokens.length,
            numHits: 0,
            average: 0,
            type: input.sentimentDictionary.type,
            locale: input.locale
          };
        } else {
          const { dictionary } = input.sentimentDictionary;
          const { negations } = input.sentimentDictionary;
          let score = 0;
          let negator = 1;
          let numHits = 0;
          for (let i = 0; i < tokens.length; i += 1) {
            const token = tokens[i].toLowerCase();
            if (negations.indexOf(token) !== -1) {
              negator = -1;
              numHits += 1;
            } else if (dictionary[token] !== void 0) {
              score += negator * dictionary[token];
              numHits += 1;
            }
          }
          input.sentiment = {
            score,
            numWords: tokens.length,
            numHits,
            average: score / tokens.length,
            type: input.sentimentDictionary.type,
            locale: input.locale
          };
        }
      } else {
        input.sentiment = {
          score: 0,
          numWords: 0,
          numHits: 0,
          average: 0,
          type: input.sentimentDictionary.type,
          locale: input.locale
        };
      }
      if (input.sentiment.score > 0) {
        input.sentiment.vote = "positive";
      } else if (input.sentiment.score < 0) {
        input.sentiment.vote = "negative";
      } else {
        input.sentiment.vote = "neutral";
      }
      return input;
    }
    async defaultPipelineProcess(input) {
      let output = await this.getDictionary(input);
      output = await this.getTokens(output);
      output = await this.calculate(output);
      delete output.sentimentDictionary;
      return output;
    }
    process(srcInput, settings) {
      const input = srcInput;
      input.settings = input.settings || settings || this.settings;
      if (this.pipelineProcess) {
        return this.runPipeline(input, this.pipelineProcess);
      }
      return this.defaultPipelineProcess(input);
    }
  }
  sentimentAnalyzer = SentimentAnalyzer;
  return sentimentAnalyzer;
}
var src$2;
var hasRequiredSrc$2;
function requireSrc$2() {
  if (hasRequiredSrc$2) return src$2;
  hasRequiredSrc$2 = 1;
  const SentimentAnalyzer = requireSentimentAnalyzer();
  src$2 = {
    SentimentAnalyzer
  };
  return src$2;
}
var slotManager;
var hasRequiredSlotManager;
function requireSlotManager() {
  if (hasRequiredSlotManager) return slotManager;
  hasRequiredSlotManager = 1;
  class SlotManager {
    /**
     * Constructor of the class.
     */
    constructor() {
      this.intents = {};
      this.isEmpty = true;
    }
    /**
     * Returns an slot given the intent and entity.
     * @param {String} intent Name of the intent.
     * @param {String} entity Name of the entity.
     * @returns {Object} Slot or undefined if not found.
     */
    getSlot(intent, entity) {
      if (!this.intents[intent]) {
        return void 0;
      }
      return this.intents[intent][entity];
    }
    /**
     * Indicates if a given slot exists, given the intent and entity.
     * @param {String} intent Name of the intent.
     * @param {String} entity Name of the entity.
     * @returns {boolean} True if the slot exists, false otherwise.
     */
    existsSlot(intent, entity) {
      return this.getSlot(intent, entity) !== void 0;
    }
    /**
     * Adds a new slot for a given intent and entity.
     * @param {String} intent Name of the intent.
     * @param {String} entity Name of the entity.
     * @param {boolean} [mandatory=false] Flag indicating if is mandatory or optional.
     * @param {Object} [questions] Question to ask when is mandatory, by locale.
     * @returns {Object} New slot instance.
     */
    addSlot(intent, entity, mandatory = false, questions) {
      this.isEmpty = false;
      if (!this.intents[intent]) {
        this.intents[intent] = {};
      }
      this.intents[intent][entity] = {
        intent,
        entity,
        mandatory,
        locales: questions || {}
      };
      return this.intents[intent][entity];
    }
    /**
     * Adds/modifies the parameter of a slot for a given intent and entity.
     * Slot questions for same locales as already existing will be overwritten.
     * If the slot for the intent and entity does not exist it fill be created.
     * @param {String} intent Name of the intent.
     * @param {String} entity Name of the entity.
     * @param {boolean} mandatory Flag indicating if is mandatory or optional.
     * @param {Object} [questions] Question to ask when is mandatory, by locale.
     * @returns {Object} New/Modified slot instance or undefined if not existing
     */
    updateSlot(intent, entity, mandatory, questions) {
      if (!this.intents[intent] || !this.intents[intent][entity]) {
        return this.addSlot(intent, entity, mandatory, questions);
      }
      const slot = this.intents[intent][entity];
      if (mandatory !== void 0) {
        slot.mandatory = mandatory;
      }
      slot.locales = Object.assign(slot.locales, questions);
      return this.intents[intent][entity];
    }
    /**
     * Remove an slot given the intent and the entity.
     * @param {String} intent Name of the intent.
     * @param {String} entity Name of the entity.
     */
    removeSlot(intent, entity) {
      if (this.intents[intent]) {
        delete this.intents[intent][entity];
      }
    }
    /**
     * Add several entities if they don't exists.
     * @param {String} intent Name of the intent.
     * @param {String[]} entities List of entities.
     * @returns {Object[]} Array of resulting entities.
     */
    addBatch(intent, entities) {
      const result = [];
      if (entities && entities.length > 0) {
        entities.forEach((entity) => {
          let slot = this.getSlot(intent, entity);
          if (!slot) {
            slot = this.addSlot(intent, entity);
          }
          result.push(slot);
        });
      }
      return result;
    }
    /**
     * Given an intent, return the array of entity names of this intent.
     * @param {String} intent Name of the intent.
     * @returns {String[]} Array of entity names of the intent.
     */
    getIntentEntityNames(intent) {
      if (!this.intents[intent]) {
        return void 0;
      }
      return Object.keys(this.intents[intent]);
    }
    /**
     * Given an intent return the information if the intent has entities defined
     *
     * @param {String} intent Name of the intent.
     * @returns {boolean} true if intent has defined entities, else false
     */
    hasIntentEntities(intent) {
      return this.getIntentEntityNames(intent).length > 0;
    }
    /**
     * Clear the slot manager.
     */
    clear() {
      this.intents = {};
    }
    /**
     * Loads the slot manager content.
     * @param {Object} src Source content.
     */
    load(src2) {
      this.intents = src2 || {};
      this.isEmpty = Object.keys(this.intents).length === 0;
    }
    /**
     * Returns the slot manager content.
     * @returns {Object} Slot manager content.
     */
    save() {
      return this.intents;
    }
    /**
     * Given an intent return the mandatory slots.
     * @param {String} intent Name of the intent
     * @returns {Object} Object with the mandatory slots.
     */
    getMandatorySlots(intent) {
      const result = {};
      const intentSlots = this.intents[intent];
      if (intentSlots) {
        const keys = Object.keys(intentSlots);
        for (let i = 0, l = keys.length; i < l; i += 1) {
          const slot = intentSlots[keys[i]];
          if (slot.mandatory) {
            result[slot.entity] = slot;
          }
        }
      }
      return result;
    }
    cleanContextEntities(intent, srcContext) {
      const context = srcContext;
      if (context.slotFill) {
        return;
      }
      const mandatorySlots = this.getMandatorySlots(intent);
      const keys = Object.keys(mandatorySlots);
      if (keys.length === 0) {
        return;
      }
      keys.forEach((key) => {
        delete context[key];
      });
    }
    generateEntityAliases(entities) {
      const aliases = [];
      const dict = {};
      for (let i = 0; i < entities.length; i += 1) {
        const entity = entities[i];
        if (!dict[entity.entity]) {
          dict[entity.entity] = [];
        }
        aliases[i] = `${entity.entity}_${dict[entity.entity].length}`;
        dict[entity.entity].push(true);
      }
      return aliases;
    }
    process(srcResult, srcContext) {
      const result = srcResult;
      const context = srcContext;
      this.cleanContextEntities(result.intent, context);
      if (context.slotFill) {
        result.intent = context.slotFill.intent;
        result.answer = context.slotFill.answer;
        result.srcAnswer = context.slotFill.srcAnswer;
      }
      if (!result.intent || result.intent === "None") {
        return false;
      }
      if (context.slotFill && context.slotFill.intent === result.intent) {
        result.entities = [...context.slotFill.entities, ...result.entities];
      }
      const mandatorySlots = this.getMandatorySlots(result.intent);
      let keys = Object.keys(mandatorySlots);
      if (keys.length === 0) {
        return false;
      }
      const aliases = this.generateEntityAliases(result.entities);
      for (let i = 0, l = result.entities.length; i < l; i += 1) {
        const entity = result.entities[i];
        delete mandatorySlots[entity.entity];
        delete mandatorySlots[aliases[i]];
      }
      if (context.slotFill && mandatorySlots[context.slotFill.currentSlot]) {
        result.entities.push({
          entity: context.slotFill.currentSlot,
          utteranceText: result.utterance,
          sourceText: result.utterance,
          accuracy: 0.95,
          start: 0,
          end: result.utterance.length - 1,
          len: result.utterance.length,
          isSlotFillingFallback: true
        });
        delete mandatorySlots[context.slotFill.currentSlot];
      }
      keys = Object.keys(mandatorySlots);
      if (context.slotFill && context.slotFill.currentSlot) {
        context.slotFill.latestSlot = context.slotFill.currentSlot;
      }
      if (!keys || keys.length === 0) {
        delete result.srcAnswer;
        return true;
      }
      if (context.slotFill && context.slotFill.intent === result.intent) {
        result.localeIso2 = context.slotFill.localeIso2;
      }
      result.slotFill = {
        localeIso2: result.localeIso2,
        intent: result.intent,
        entities: result.entities,
        answer: result.answer,
        srcAnswer: result.srcAnswer
      };
      if (context.slotFill && context.slotFill.latestSlot) {
        result.slotFill.latestSlot = context.slotFill.latestSlot;
      }
      const currentSlot = mandatorySlots[keys[0]];
      result.slotFill.currentSlot = currentSlot.entity;
      result.srcAnswer = currentSlot.locales[result.localeIso2];
      context.slotFill = result.slotFill;
      return true;
    }
  }
  slotManager = SlotManager;
  return slotManager;
}
var src$1;
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  const SlotManager = requireSlotManager();
  src$1 = {
    SlotManager
  };
  return src$1;
}
var contextManager;
var hasRequiredContextManager;
function requireContextManager() {
  if (hasRequiredContextManager) return contextManager;
  hasRequiredContextManager = 1;
  const { Clonable } = requireSrc$9();
  const dataName = "_data";
  class ContextManager extends Clonable {
    constructor(settings = {}, container) {
      super(
        { settings: {}, container: settings.container || container },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = `context-manager`;
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.contextDictionary = {};
      this.defaultData = {};
    }
    registerDefault() {
      this.container.registerConfiguration("context-manager", {
        tableName: "context"
      });
    }
    async getInputContextId(input) {
      let result;
      if (this.onGetInputContextId) {
        result = await this.onGetInputContextId(input);
      }
      if (!result && input && input.activity) {
        if (input.activity.address && input.activity.address.conversation) {
          result = input.activity.address.conversation.id;
        } else if (input.activity.conversation) {
          result = input.activity.conversation.id;
        }
      }
      return result;
    }
    async getContext(input) {
      const id = await this.getInputContextId(input);
      let result;
      if (id) {
        if (this.settings.tableName) {
          const database = this.container ? this.container.get("database") : void 0;
          if (database) {
            result = await database.findOne(this.settings.tableName, {
              conversationId: id
            }) || { conversationId: id };
          }
        }
        if (!result) {
          result = this.contextDictionary[id] || { conversationId: id };
        }
      } else {
        result = {};
      }
      result[dataName] = this.defaultData;
      return result;
    }
    async setContext(input, context) {
      const logger = this.container.get("logger");
      const id = await this.getInputContextId(input);
      if (id) {
        if (!context.id) {
          const savedContext = await this.getContext(input);
          if (savedContext) {
            context.id = savedContext.id;
          }
        }
        const keys = Object.keys(context);
        const clone = { conversationId: id };
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          if (!key.startsWith("_")) {
            clone[key] = context[key];
          }
        }
        if (this.settings.tableName) {
          const database = this.container ? this.container.get("database") : void 0;
          if (database) {
            await database.save(this.settings.tableName, clone);
          } else {
            this.contextDictionary[id] = clone;
          }
        } else {
          this.contextDictionary[id] = clone;
        }
        if (this.onCtxUpdate) {
          logger.debug(`emmitting event onCtxUpdate...`);
          await this.onCtxUpdate(clone);
        }
      }
    }
    async resetConversations() {
      for (const cid of Object.keys(this.contextDictionary)) {
        await this.resetConversation(cid);
      }
    }
    async resetConversation(cid) {
      const logger = this.container.get("logger");
      logger.debug(`resetting context in conversation: ${cid}`);
      const conversationCtx = this.contextDictionary[cid];
      Object.keys(conversationCtx).forEach((convCtxKey) => {
        delete conversationCtx[convCtxKey];
      });
      this.contextDictionary[cid].dialogStack = [];
      this.contextDictionary[cid].variableName = void 0;
    }
  }
  contextManager = ContextManager;
  return contextManager;
}
var nlp;
var hasRequiredNlp;
function requireNlp() {
  if (hasRequiredNlp) return nlp;
  hasRequiredNlp = 1;
  const { Clonable, containerBootstrap } = requireSrc$9();
  const { NluManager, NluNeural } = requireSrc$5();
  const {
    Ner,
    ExtractorEnum,
    ExtractorRegex,
    ExtractorTrim,
    ExtractorBuiltin
  } = requireSrc$4();
  const { ActionManager, NlgManager } = requireSrc$3();
  const { SentimentAnalyzer } = requireSrc$2();
  const { SlotManager } = requireSrc$1();
  const ContextManager = requireContextManager();
  class Nlp extends Clonable {
    constructor(settings = {}, container) {
      super(
        {
          settings: {},
          container: settings.container || container || containerBootstrap()
        },
        container
      );
      this.applySettings(this.settings, settings);
      if (!this.settings.tag) {
        this.settings.tag = `nlp`;
      }
      this.registerDefault();
      this.applySettings(
        this.settings,
        this.container.getConfiguration(this.settings.tag)
      );
      this.nluManager = this.container.get("nlu-manager", this.settings.nlu);
      this.ner = this.container.get("ner", this.settings.ner);
      this.nlgManager = this.container.get("nlg-manager", this.settings.nlg);
      this.actionManager = this.container.get(
        "action-manager",
        this.settings.action
      );
      this.sentiment = this.container.get(
        "sentiment-analyzer",
        this.settings.sentiment
      );
      this.slotManager = this.container.get("SlotManager", this.settings.slot);
      this.contextManager = this.container.get(
        "context-manager",
        this.settings.context
      );
      this.forceNER = this.settings.forceNER;
      if (this.forceNER === void 0) {
        this.forceNER = false;
      }
      this.initialize();
    }
    registerDefault() {
      this.container.registerConfiguration(
        "nlp",
        {
          threshold: 0.5,
          autoLoad: true,
          autoSave: true,
          modelFileName: "model.nlp",
          executeActionsBeforeAnswers: false
        },
        false
      );
      this.use(NluManager);
      this.use(Ner);
      this.use(ExtractorEnum);
      this.use(ExtractorRegex);
      this.use(ExtractorTrim);
      this.use(ExtractorBuiltin);
      this.use(NlgManager);
      this.use(ActionManager);
      this.use(NluNeural);
      this.use(SentimentAnalyzer);
      this.use(ContextManager);
      this.container.register("SlotManager", SlotManager, false);
    }
    initialize() {
      if (this.settings.nlu) {
        const locales = Object.keys(this.settings.nlu);
        for (let i = 0; i < locales.length; i += 1) {
          const locale = locales[i];
          const domains = Object.keys(this.settings.nlu[locale]);
          for (let j = 0; j < domains.length; j += 1) {
            const domain = domains[j];
            const settings = this.settings.nlu[locale][domain];
            const { className } = settings;
            delete settings.className;
            this.useNlu(className, locale, domain, settings);
          }
        }
      }
      if (this.settings.languages) {
        this.addLanguage(this.settings.languages);
      }
      if (this.settings.locales) {
        this.addLanguage(this.settings.locales);
      }
      if (this.settings.calculateSentiment === void 0) {
        this.settings.calculateSentiment = true;
      }
      if (this.settings.executeActionsBeforeAnswers === void 0) {
        this.settings.executeActionsBeforeAnswers = false;
      }
    }
    async start() {
      if (this.settings.corpora) {
        await this.addCorpora(this.settings.corpora);
      }
    }
    async loadOrTrain() {
      let loaded = false;
      if (this.settings.autoLoad) {
        loaded = await this.load(this.settings.modelFileName);
      }
      if (!loaded) {
        await this.train();
      }
    }
    useNlu(clazz, locale, domain, settings) {
      if (!locale) {
        locale = "??";
      }
      if (Array.isArray(locale)) {
        for (let i = 0; i < locale.length; i += 1) {
          this.useNlu(clazz, locale[i], domain, settings);
        }
      } else {
        const className = typeof clazz === "string" ? clazz : this.container.use(clazz);
        let config = this.container.getConfiguration(`domain-manager-${locale}`);
        if (!config) {
          config = {};
          this.container.registerConfiguration(
            `domain-manager-${locale}`,
            config
          );
        }
        if (!config.nluByDomain) {
          config.nluByDomain = {};
        }
        const domainName = !domain || domain === "*" ? "default" : domain;
        if (!config.nluByDomain[domainName]) {
          config.nluByDomain[domainName] = {};
        }
        config.nluByDomain[domainName].className = className;
        config.nluByDomain[domainName].settings = settings;
      }
    }
    guessLanguage(input) {
      return this.nluManager.guessLanguage(input);
    }
    addLanguage(locales) {
      return this.nluManager.addLanguage(locales);
    }
    removeLanguage(locales) {
      return this.nluManager.removeLanguage(locales);
    }
    addAdditionalEnumEntityUtterances() {
      if (!this.settings.languages) {
        return;
      }
      this.settings.languages.forEach((locale) => {
        const replaceTexts = {};
        const rules = this.ner.getRules(locale);
        rules.forEach((rule) => {
          if (rule.type === "enum") {
            const entityName = this.ner.nameToEntity(rule.name);
            replaceTexts[entityName] = replaceTexts[entityName] || [];
            rule.rules.forEach((value) => {
              replaceTexts[entityName] = replaceTexts[entityName].concat(
                value.texts
              );
            });
          }
        });
        const manager = this.nluManager.consolidateManager(locale);
        const sentences = manager.getSentences();
        sentences.forEach((sentence) => {
          const entities = this.ner.getEntitiesFromUtterance(locale, sentence.utterance).map((entityName) => this.ner.nameToEntity(entityName));
          this.replaceEnumEntitiesInSentence(
            manager,
            locale,
            sentence.domain,
            sentence.utterance,
            sentence.intent,
            entities,
            replaceTexts
          );
        });
      });
    }
    replaceEnumEntitiesInSentence(manager, locale, domain, utterance, intent, entityList, replaceTexts) {
      if (!entityList.length) {
        this.nluManager.guesser.addExtraSentence(locale, utterance);
        manager.add(domain, utterance, intent);
        return;
      }
      const entityName = entityList[0];
      if (replaceTexts[entityName] && replaceTexts[entityName].length) {
        replaceTexts[entityName].forEach((replaceText) => {
          const entityUtterance = utterance.replace(entityName, replaceText);
          this.replaceEnumEntitiesInSentence(
            manager,
            locale,
            domain,
            entityUtterance,
            intent,
            entityList.slice(1),
            replaceTexts
          );
        });
      } else {
        this.replaceEnumEntitiesInSentence(
          manager,
          locale,
          domain,
          utterance,
          intent,
          entityList.slice(1),
          replaceTexts
        );
      }
    }
    addDocument(locale, utterance, intent) {
      const entities = this.ner.getEntitiesFromUtterance(utterance);
      this.slotManager.addBatch(intent, entities);
      return this.nluManager.add(locale, utterance, intent);
    }
    removeDocument(locale, utterance, intent) {
      return this.nluManager.remove(locale, utterance, intent);
    }
    getRulesByName(locale, name) {
      return this.ner.getRulesByName(locale, name);
    }
    addNerRule(locale, name, type, rule) {
      return this.ner.addRule(locale, name, type, rule);
    }
    removeNerRule(locale, name, rule) {
      return this.ner.removeRule(locale, name, rule);
    }
    addNerRuleOptionTexts(locale, name, option, texts) {
      return this.ner.addRuleOptionTexts(locale, name, option, texts);
    }
    removeNerRuleOptionTexts(locale, name, option, texts) {
      return this.ner.removeRuleOptionTexts(locale, name, option, texts);
    }
    addNerRegexRule(locale, name, regex) {
      return this.ner.addRegexRule(locale, name, regex);
    }
    addNerBetweenCondition(locale, name, left, right, opts) {
      return this.ner.addBetweenCondition(locale, name, left, right, opts);
    }
    addNerBetweenLastCondition(locale, name, left, right, opts) {
      return this.ner.addBetweenLastCondition(locale, name, left, right, opts);
    }
    addNerPositionCondition(locale, name, position, words, opts) {
      return this.ner.addPositionCondition(locale, name, position, words, opts);
    }
    addNerAfterCondition(locale, name, words, opts) {
      return this.ner.addAfterCondition(locale, name, words, opts);
    }
    addNerAfterFirstCondition(locale, name, words, opts) {
      return this.ner.addAfterFirstCondition(locale, name, words, opts);
    }
    addNerAfterLastCondition(locale, name, words, opts) {
      return this.ner.addAfterLastCondition(locale, name, words, opts);
    }
    addNerBeforeCondition(locale, name, words, opts) {
      return this.ner.addBeforeCondition(locale, name, words, opts);
    }
    addNerBeforeFirstCondition(locale, name, words, opts) {
      return this.ner.addBeforeFirstCondition(locale, name, words, opts);
    }
    addNerBeforeLastCondition(locale, name, words, opts) {
      return this.ner.addBeforeLastCondition(locale, name, words, opts);
    }
    assignDomain(locale, intent, domain) {
      return this.nluManager.assignDomain(locale, intent, domain);
    }
    getIntentDomain(locale, intent) {
      return this.nluManager.getIntentDomain(locale, intent);
    }
    getDomains() {
      return this.nluManager.getDomains();
    }
    addAction(intent, action, parameters, fn) {
      return this.actionManager.addAction(intent, action, parameters, fn);
    }
    registerActionFunction(action, fn) {
      return this.actionManager.registerActionInMap(action, fn);
    }
    getActions(intent) {
      return this.actionManager.findActions(intent);
    }
    removeAction(intent, action, parameters) {
      return this.actionManager.removeAction(intent, action, parameters);
    }
    removeActions(intent) {
      return this.actionManager.removeActions(intent);
    }
    removeActionFunction(action) {
      return this.actionManager.removeActionFromMap(action);
    }
    addAnswer(locale, intent, answer, opts) {
      return this.nlgManager.add(locale, intent, answer, opts);
    }
    removeAnswer(locale, intent, answer, opts) {
      return this.nlgManager.remove(locale, intent, answer, opts);
    }
    findAllAnswers(locale, intent) {
      const response = this.nlgManager.findAllAnswers({ locale, intent });
      return response.answers;
    }
    async addCorpora(names) {
      if (names) {
        if (Array.isArray(names)) {
          for (let i = 0; i < names.length; i += 1) {
            await this.addCorpus(names[i]);
          }
        } else {
          await this.addCorpus(names);
        }
      }
    }
    async addImported(input) {
      let content;
      if (input.content) {
        content = input.content;
      } else if (input.filename) {
        const fs = this.container.get("fs");
        content = await fs.readFile(input.filename);
        if (!content) {
          throw new Error(`Corpus not found "${input.filename}"`);
        }
      } else {
        throw new Error("Corpus information without content or file name");
      }
      let importer = this.container.get(input.importer);
      if (!importer) {
        importer = this.container.get(`${input.importer}-importer`);
      }
      if (!importer) {
        throw new Error(`Corpus importer not found: ${input.importer}`);
      }
      const corpora = importer.transform(content, input);
      for (let i = 0; i < corpora.length; i += 1) {
        this.addCorpus(corpora[i]);
      }
    }
    addEntities(entities, locale) {
      const keys = Object.keys(entities);
      for (let i = 0; i < keys.length; i += 1) {
        const entityName = keys[i];
        let entity = entities[entityName];
        if (typeof entity === "string") {
          entity = { regex: [entity] };
        }
        let finalLocale = entity.locale;
        if (!finalLocale) {
          finalLocale = locale || "en";
        }
        if (typeof finalLocale === "string") {
          finalLocale = finalLocale.slice(0, 2);
        }
        if (entity.options) {
          const optionNames = Object.keys(entity.options);
          for (let j = 0; j < optionNames.length; j += 1) {
            this.addNerRuleOptionTexts(
              finalLocale,
              entityName,
              optionNames[j],
              entity.options[optionNames[j]]
            );
          }
        }
        if (entity.regex) {
          if (Array.isArray(entity.regex)) {
            for (let j = 0; j < entity.regex.length; j += 1) {
              this.addNerRegexRule(finalLocale, entityName, entity.regex[j]);
            }
          } else if (typeof entity.regex === "string" && entity.regex.trim()) {
            this.addNerRegexRule(finalLocale, entityName, entity.regex);
          }
        }
        if (entity.trim) {
          for (let j = 0; j < entity.trim.length; j += 1) {
            switch (entity.trim[j].position) {
              case "after":
              case "afterLast":
              case "afterFirst":
              case "before":
              case "beforeFirst":
              case "beforeLast":
                this.addNerPositionCondition(
                  finalLocale,
                  entityName,
                  entity.trim[j].position,
                  entity.trim[j].words,
                  entity.trim[j].opts
                );
                break;
              case "between":
                this.addNerBetweenCondition(
                  finalLocale,
                  entityName,
                  entity.trim[j].leftWords,
                  entity.trim[j].rightWords,
                  entity.trim[j].opts
                );
                break;
              case "betweenLast":
                this.addNerBetweenLastCondition(
                  finalLocale,
                  entityName,
                  entity.trim[j].leftWords,
                  entity.trim[j].rightWords,
                  entity.trim[j].opts
                );
                break;
            }
          }
        }
      }
    }
    addData(data, locale, domain) {
      for (let i = 0; i < data.length; i += 1) {
        const current = data[i];
        const { intent, utterances, answers, slotFilling, actions } = current;
        for (let j = 0; j < utterances.length; j += 1) {
          if (domain) {
            this.assignDomain(locale, intent, domain.name);
          }
          this.addDocument(locale, utterances[j], intent);
        }
        if (answers) {
          for (let j = 0; j < answers.length; j += 1) {
            const answer = answers[j];
            if (typeof answer === "string") {
              this.addAnswer(locale, intent, answer);
            } else {
              this.addAnswer(locale, intent, answer.answer, answer.opts);
            }
          }
        }
        if (slotFilling) {
          const entities = Object.keys(slotFilling);
          for (let j = 0; j < entities.length; j += 1) {
            const slot = slotFilling[entities[j]];
            let mandatory;
            const slotQuestions = {};
            if (typeof slot === "string") {
              slotQuestions[locale] = slot;
              mandatory = true;
            } else {
              slotQuestions[locale] = slot.question;
              mandatory = slot.mandatory || false;
            }
            this.slotManager.updateSlot(
              intent,
              entities[j],
              mandatory,
              slotQuestions
            );
          }
        }
        if (actions) {
          actions.forEach((action) => {
            if (!action) return;
            if (typeof action === "object") {
              if (!action.name) return;
              this.addAction(intent, action.name, action.parameters || []);
            } else {
              this.addAction(intent, action, []);
            }
          });
        }
      }
    }
    async addCorpus(fileName) {
      if (fileName.importer) {
        await this.addImported(fileName);
      } else {
        let corpus = fileName;
        const fs = this.container.get("fs");
        if (typeof fileName === "string") {
          const fileData = await fs.readFile(fileName);
          if (!fileData) {
            throw new Error(`Corpus not found "${fileName}"`);
          }
          corpus = typeof fileData === "string" ? JSON.parse(fileData) : fileData;
        }
        if (corpus.contextData) {
          let { contextData } = corpus;
          if (typeof corpus.contextData === "string") {
            contextData = JSON.parse(await fs.readFile(corpus.contextData));
          }
          const contextManager2 = this.container.get("context-manager");
          const keys = Object.keys(contextData);
          for (let i = 0; i < keys.length; i += 1) {
            contextManager2.defaultData[keys[i]] = contextData[keys[i]];
          }
        }
        if (corpus.domains) {
          if (corpus.entities) {
            this.addEntities(corpus.entities);
          }
          for (let i = 0; i < corpus.domains.length; i += 1) {
            const domain = corpus.domains[i];
            const { data, entities } = domain;
            const locale = domain.locale.slice(0, 2);
            this.addLanguage(locale);
            if (entities) {
              this.addEntities(entities, locale);
            }
            this.addData(data, locale, domain);
          }
        } else {
          const locale = corpus.locale.slice(0, 2);
          this.addLanguage(locale);
          const { data, entities } = corpus;
          if (entities) {
            this.addEntities(entities, locale);
          }
          this.addData(data, locale);
        }
      }
    }
    getSentiment(locale, utterance) {
      if (typeof locale === "object") {
        return this.sentiment.process(locale);
      }
      if (!utterance) {
        utterance = locale;
        locale = this.guessLanguage(utterance);
      }
      return this.sentiment.process({ utterance, locale });
    }
    describeLanguage(locale, name) {
      this.nluManager.describeLanguage(locale, name);
    }
    async train() {
      this.nluManager.addLanguage(this.settings.languages);
      const result = await this.nluManager.train();
      if (this.settings.autoSave) {
        await this.save(this.settings.modelFileName, true);
      }
      return result;
    }
    async classify(locale, utterance, settings) {
      return this.nluManager.process(
        locale,
        utterance,
        settings || this.settings.nlu
      );
    }
    async extractEntities(locale, utterance, context, settings) {
      if (typeof locale === "object") {
        return this.ner.process(locale);
      }
      if (!utterance) {
        utterance = locale;
        locale = void 0;
      }
      if (!locale) {
        locale = this.guessLanguage(utterance);
      }
      const output = await this.ner.process({
        locale,
        utterance,
        context,
        settings: this.applySettings(settings, this.settings.ner)
      });
      return output;
    }
    organizeEntities(entities) {
      const dict = {};
      for (let i = 0; i < entities.length; i += 1) {
        const entity = entities[i];
        if (!dict[entity.entity]) {
          dict[entity.entity] = [];
        }
        dict[entity.entity].push(entity);
      }
      const result = [];
      Object.keys(dict).forEach((key) => {
        const arr = dict[key];
        if (arr.length === 1) {
          result.push(arr[0]);
        } else {
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].alias = `${key}_${i}`;
          }
          result.push({
            entity: key,
            isList: true,
            items: arr
          });
        }
      });
      return result;
    }
    structureEntities(output) {
      const organizedEntities = this.organizeEntities(output.entities);
      if (!output.context.entities) {
        output.context.entities = {};
      }
      for (let i = 0; i < organizedEntities.length; i += 1) {
        const entity = organizedEntities[i];
        output.context.entities[entity.entity] = entity;
        if (entity.alias) {
          output.context[entity.alias] = entity.sourceText;
        }
        if (entity.isList) {
          for (let j = 0; j < entity.items.length; j += 1) {
            output.context[entity.items[j].alias] = entity.items[j].sourceText;
          }
        } else {
          output.context[`${entity.entity}_0`] = entity.sourceText;
        }
        output.context[entity.entity] = entity.isList ? entity.items[0].sourceText : entity.sourceText;
      }
      return output;
    }
    async process(locale, utterance, srcContext, settings) {
      let sourceInput;
      let context = srcContext;
      if (typeof locale === "object") {
        if (typeof utterance === "object" && utterance.value) {
          locale = void 0;
          utterance = utterance.value;
        } else {
          sourceInput = locale;
        }
      }
      if (!sourceInput) {
        if (!utterance) {
          utterance = locale;
          locale = void 0;
        }
        if (!locale) {
          locale = this.guessLanguage(utterance);
        }
        sourceInput = {
          locale,
          utterance,
          settings
        };
        if (settings) {
          if (settings.activity && !sourceInput.activity) {
            sourceInput.activity = settings.activity;
          }
          if (settings.conversationId && !sourceInput.activity) {
            sourceInput.activity = {
              conversation: {
                id: settings.conversationId
              }
            };
          }
        }
      } else {
        locale = sourceInput.locale;
        utterance = sourceInput.utterance || sourceInput.message || sourceInput.text;
      }
      if (!context) {
        context = await this.contextManager.getContext(sourceInput);
      }
      context.channel = sourceInput.channel;
      context.app = sourceInput.app;
      context.from = sourceInput.from || null;
      const input = {
        locale,
        utterance,
        context,
        settings: this.applySettings(settings, this.settings.nlu)
      };
      const forceNER = input.settings && "forceNER" in input.settings ? input.settings.forceNER : this.forceNER;
      let output = await this.nluManager.process(input);
      if (forceNER || !this.slotManager.isEmpty) {
        const optionalUtterance = await this.ner.generateEntityUtterance(
          output.locale || locale,
          utterance
        );
        if (optionalUtterance && optionalUtterance !== utterance) {
          const optionalInput = {
            locale: output.locale || locale,
            utterance: optionalUtterance,
            context,
            settings: this.applySettings(settings, this.settings.nlu)
          };
          const optionalOutput = await this.nluManager.process(optionalInput);
          if (optionalOutput && (optionalOutput.score > output.score || output.intent === "None")) {
            output = optionalOutput;
            output.utterance = utterance;
            output.optionalUtterance = optionalUtterance;
          }
        }
      }
      if (output.score < this.settings.threshold) {
        output.score = 1;
        output.intent = "None";
      }
      output.context = context;
      if (forceNER || !this.slotManager.isEmpty) {
        const intentEntities = this.slotManager.getIntentEntityNames(
          output.intent
        );
        output = await this.ner.process({ ...output }, intentEntities);
      } else {
        output.entities = [];
        output.sourceEntities = [];
      }
      const stemmer = this.container.get(`stemmer-${output.locale}`);
      if (stemmer && stemmer.lastFill) {
        stemmer.lastFill(output);
      }
      output = this.structureEntities(output);
      if (forceNER || !this.slotManager.isEmpty) {
        if (this.slotManager.process(output, context)) {
          output = this.structureEntities(output);
        }
        context.slotFill = output.slotFill;
      }
      if (this.settings.executeActionsBeforeAnswers) {
        output = await this.actionManager.run({ ...output });
      }
      if (this.settings.executeActionsBeforeAnswers && output.answer) {
        output.answer = this.nlgManager.renderText(output.answer, context);
      } else {
        const answers = await this.nlgManager.run({ ...output });
        output.answers = answers.answers;
        output.answer = answers.answer;
      }
      if (output.srcAnswer) {
        output.answer = this.nlgManager.renderText(output.srcAnswer, context);
      }
      if (!this.settings.executeActionsBeforeAnswers) {
        output = await this.actionManager.run({ ...output });
      }
      if (this.settings.calculateSentiment) {
        const sentiment = await this.getSentiment(locale, utterance);
        output.sentiment = sentiment ? sentiment.sentiment : void 0;
      }
      await this.contextManager.setContext(sourceInput, context);
      delete output.context;
      delete output.settings;
      const result = sourceInput ? this.applySettings(sourceInput, output) : output;
      if (result.intent === "None" && !result.answer) {
        const openQuestion = this.container.get("open-question");
        if (openQuestion) {
          const qnaAnswer = await openQuestion.getAnswer(
            result.locale,
            result.utterance
          );
          if (qnaAnswer && qnaAnswer.answer && qnaAnswer.answer.length > 0) {
            result.answer = qnaAnswer.answer;
            result.isOpenQuestionAnswer = true;
            result.openQuestionFirstCharacter = qnaAnswer.position;
            result.openQuestionScore = qnaAnswer.score;
          }
        }
      }
      if (this.onIntent) {
        await this.onIntent(this, result);
      } else {
        const eventName = `onIntent(${result.intent})`;
        const pipeline = this.container.getPipeline(eventName);
        if (pipeline) {
          await this.container.runPipeline(pipeline, result, this);
        }
      }
      return result;
    }
    toJSON() {
      const result = {
        settings: { ...this.settings },
        nluManager: this.nluManager.toJSON(),
        ner: this.ner.toJSON(),
        nlgManager: this.nlgManager.toJSON(),
        actionManager: this.actionManager.toJSON(),
        slotManager: this.slotManager.save()
      };
      delete result.settings.container;
      return result;
    }
    fromJSON(json) {
      this.applySettings(this.settings, json.settings);
      this.nluManager.fromJSON(json.nluManager);
      this.ner.fromJSON(json.ner);
      this.nlgManager.fromJSON(json.nlgManager);
      this.actionManager.fromJSON(json.actionManager);
      this.slotManager.load(json.slotManager);
    }
    export(minified = false) {
      const clone = this.toJSON();
      return minified ? JSON.stringify(clone) : JSON.stringify(clone, null, 2);
    }
    import(data) {
      const clone = typeof data === "string" ? JSON.parse(data) : data;
      this.fromJSON(clone);
    }
    async save(srcFileName, minified = false) {
      const fs = this.container.get("fs");
      const fileName = srcFileName || "model.nlp";
      await fs.writeFile(fileName, this.export(minified));
    }
    async load(srcFileName) {
      const fs = this.container.get("fs");
      const fileName = srcFileName || "model.nlp";
      const data = await fs.readFile(fileName);
      if (data) {
        this.import(data);
        return true;
      }
      return false;
    }
  }
  nlp = Nlp;
  return nlp;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  const Nlp = requireNlp();
  const ContextManager = requireContextManager();
  src = {
    Nlp,
    ContextManager
  };
  return src;
}
var srcExports = requireSrc();
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null
}, [srcExports]);
export {
  index as i
};
