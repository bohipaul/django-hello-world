import { r as requireSrc$1 } from "./index.GUmXO0j9.js";
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
var tokenizerFr;
var hasRequiredTokenizerFr;
function requireTokenizerFr() {
  if (hasRequiredTokenizerFr) return tokenizerFr;
  hasRequiredTokenizerFr = 1;
  const { Tokenizer } = requireSrc$1();
  class TokenizerFr extends Tokenizer {
    constructor(container, shouldTokenize) {
      super(container, shouldTokenize);
      this.name = "tokenizer-fr";
    }
    innerTokenize(text) {
      const replaced = text.replace(/’/gi, "'");
      const slices = replaced.split(/[\s,.!?;:([\]’'"¡¿)/]+/).filter((x) => x);
      return slices;
    }
  }
  tokenizerFr = TokenizerFr;
  return tokenizerFr;
}
var stemmerFr;
var hasRequiredStemmerFr;
function requireStemmerFr() {
  if (hasRequiredStemmerFr) return stemmerFr;
  hasRequiredStemmerFr = 1;
  const { Among, BaseStemmer } = requireSrc$1();
  class StemmerFr extends BaseStemmer {
    constructor(container) {
      super(container);
      this.name = "stemmer-fr";
      this.I_p2 = 0;
      this.I_p1 = 0;
      this.I_pV = 0;
    }
    copy_from(other) {
      this.I_p2 = other.I_p2;
      this.I_p1 = other.I_p1;
      this.I_pV = other.I_pV;
      super.copy_from(other);
    }
    r_prelude() {
      let v_1;
      let v_2;
      let v_3;
      let v_4;
      replab0: while (true) {
        v_1 = this.cursor;
        let lab1 = true;
        lab1: while (lab1 == true) {
          lab1 = false;
          golab2: while (true) {
            v_2 = this.cursor;
            let lab3 = true;
            lab3: while (lab3 == true) {
              lab3 = false;
              let lab4 = true;
              lab4: while (lab4 == true) {
                lab4 = false;
                v_3 = this.cursor;
                let lab5 = true;
                lab5: while (lab5 == true) {
                  lab5 = false;
                  if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
                    break;
                  }
                  this.bra = this.cursor;
                  let lab6 = true;
                  lab6: while (lab6 == true) {
                    lab6 = false;
                    v_4 = this.cursor;
                    let lab7 = true;
                    while (lab7 == true) {
                      lab7 = false;
                      if (!this.eq_s(1, "u")) {
                        break;
                      }
                      this.ket = this.cursor;
                      if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
                        break;
                      }
                      if (!this.slice_from("U")) {
                        return false;
                      }
                      break lab6;
                    }
                    this.cursor = v_4;
                    let lab8 = true;
                    while (lab8 == true) {
                      lab8 = false;
                      if (!this.eq_s(1, "i")) {
                        break;
                      }
                      this.ket = this.cursor;
                      if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
                        break;
                      }
                      if (!this.slice_from("I")) {
                        return false;
                      }
                      break lab6;
                    }
                    this.cursor = v_4;
                    if (!this.eq_s(1, "y")) {
                      break lab5;
                    }
                    this.ket = this.cursor;
                    if (!this.slice_from("Y")) {
                      return false;
                    }
                  }
                  break lab4;
                }
                this.cursor = v_3;
                let lab9 = true;
                while (lab9 == true) {
                  lab9 = false;
                  this.bra = this.cursor;
                  if (!this.eq_s(1, "y")) {
                    break;
                  }
                  this.ket = this.cursor;
                  if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
                    break;
                  }
                  if (!this.slice_from("Y")) {
                    return false;
                  }
                  break lab4;
                }
                this.cursor = v_3;
                if (!this.eq_s(1, "q")) {
                  break lab3;
                }
                this.bra = this.cursor;
                if (!this.eq_s(1, "u")) {
                  break lab3;
                }
                this.ket = this.cursor;
                if (!this.slice_from("U")) {
                  return false;
                }
              }
              this.cursor = v_2;
              break golab2;
            }
            this.cursor = v_2;
            if (this.cursor >= this.limit) {
              break lab1;
            }
            this.cursor++;
          }
          continue replab0;
        }
        this.cursor = v_1;
        break;
      }
      return true;
    }
    r_mark_regions() {
      let v_1;
      let v_2;
      let v_4;
      this.I_pV = this.limit;
      this.I_p1 = this.limit;
      this.I_p2 = this.limit;
      v_1 = this.cursor;
      let lab0 = true;
      lab0: while (lab0 == true) {
        lab0 = false;
        let lab1 = true;
        lab1: while (lab1 == true) {
          lab1 = false;
          v_2 = this.cursor;
          let lab2 = true;
          while (lab2 == true) {
            lab2 = false;
            if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            if (this.cursor >= this.limit) {
              break;
            }
            this.cursor++;
            break lab1;
          }
          this.cursor = v_2;
          let lab3 = true;
          while (lab3 == true) {
            lab3 = false;
            if (this.find_among(StemmerFr.a_0, 3) == 0) {
              break;
            }
            break lab1;
          }
          this.cursor = v_2;
          if (this.cursor >= this.limit) {
            break lab0;
          }
          this.cursor++;
          golab4: while (true) {
            let lab5 = true;
            while (lab5 == true) {
              lab5 = false;
              if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
                break;
              }
              break golab4;
            }
            if (this.cursor >= this.limit) {
              break lab0;
            }
            this.cursor++;
          }
        }
        this.I_pV = this.cursor;
      }
      this.cursor = v_1;
      v_4 = this.cursor;
      let lab6 = true;
      lab6: while (lab6 == true) {
        lab6 = false;
        golab7: while (true) {
          let lab8 = true;
          while (lab8 == true) {
            lab8 = false;
            if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            break golab7;
          }
          if (this.cursor >= this.limit) {
            break lab6;
          }
          this.cursor++;
        }
        golab9: while (true) {
          let lab10 = true;
          while (lab10 == true) {
            lab10 = false;
            if (!this.out_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            break golab9;
          }
          if (this.cursor >= this.limit) {
            break lab6;
          }
          this.cursor++;
        }
        this.I_p1 = this.cursor;
        golab11: while (true) {
          let lab12 = true;
          while (lab12 == true) {
            lab12 = false;
            if (!this.in_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            break golab11;
          }
          if (this.cursor >= this.limit) {
            break lab6;
          }
          this.cursor++;
        }
        golab13: while (true) {
          let lab14 = true;
          while (lab14 == true) {
            lab14 = false;
            if (!this.out_grouping(StemmerFr.g_v, 97, 251)) {
              break;
            }
            break golab13;
          }
          if (this.cursor >= this.limit) {
            break lab6;
          }
          this.cursor++;
        }
        this.I_p2 = this.cursor;
      }
      this.cursor = v_4;
      return true;
    }
    r_postlude() {
      let among_var;
      let v_1;
      replab0: while (true) {
        v_1 = this.cursor;
        let lab1 = true;
        lab1: while (lab1 == true) {
          lab1 = false;
          this.bra = this.cursor;
          among_var = this.find_among(StemmerFr.a_1, 4);
          if (among_var == 0) {
            break;
          }
          this.ket = this.cursor;
          switch (among_var) {
            case 0:
              break lab1;
            case 1:
              if (!this.slice_from("i")) {
                return false;
              }
              break;
            case 2:
              if (!this.slice_from("u")) {
                return false;
              }
              break;
            case 3:
              if (!this.slice_from("y")) {
                return false;
              }
              break;
            case 4:
              if (this.cursor >= this.limit) {
                break lab1;
              }
              this.cursor++;
              break;
          }
          continue replab0;
        }
        this.cursor = v_1;
        break;
      }
      return true;
    }
    r_RV() {
      if (!(this.I_pV <= this.cursor)) {
        return false;
      }
      return true;
    }
    r_R1() {
      if (!(this.I_p1 <= this.cursor)) {
        return false;
      }
      return true;
    }
    r_R2() {
      if (!(this.I_p2 <= this.cursor)) {
        return false;
      }
      return true;
    }
    r_standard_suffix() {
      let among_var;
      let v_1;
      let v_2;
      let v_3;
      let v_4;
      let v_5;
      let v_6;
      let v_7;
      let v_8;
      let v_9;
      let v_10;
      let v_11;
      this.ket = this.cursor;
      among_var = this.find_among_b(StemmerFr.a_4, 43);
      if (among_var == 0) {
        return false;
      }
      this.bra = this.cursor;
      switch (among_var) {
        case 0:
          return false;
        case 1:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 2:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          v_1 = this.limit - this.cursor;
          var lab0 = true;
          while (lab0 == true) {
            lab0 = false;
            this.ket = this.cursor;
            if (!this.eq_s_b(2, "ic")) {
              this.cursor = this.limit - v_1;
              break;
            }
            this.bra = this.cursor;
            let lab1 = true;
            lab1: while (lab1 == true) {
              lab1 = false;
              v_2 = this.limit - this.cursor;
              let lab2 = true;
              while (lab2 == true) {
                lab2 = false;
                if (!this.r_R2()) {
                  break;
                }
                if (!this.slice_del()) {
                  return false;
                }
                break lab1;
              }
              this.cursor = this.limit - v_2;
              if (!this.slice_from("iqU")) {
                return false;
              }
            }
          }
          break;
        case 3:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_from("log")) {
            return false;
          }
          break;
        case 4:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_from("u")) {
            return false;
          }
          break;
        case 5:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_from("ent")) {
            return false;
          }
          break;
        case 6:
          if (!this.r_RV()) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          v_3 = this.limit - this.cursor;
          var lab3 = true;
          lab3: while (lab3 == true) {
            lab3 = false;
            this.ket = this.cursor;
            among_var = this.find_among_b(StemmerFr.a_2, 6);
            if (among_var == 0) {
              this.cursor = this.limit - v_3;
              break;
            }
            this.bra = this.cursor;
            switch (among_var) {
              case 0:
                this.cursor = this.limit - v_3;
                break lab3;
              case 1:
                if (!this.r_R2()) {
                  this.cursor = this.limit - v_3;
                  break lab3;
                }
                if (!this.slice_del()) {
                  return false;
                }
                this.ket = this.cursor;
                if (!this.eq_s_b(2, "at")) {
                  this.cursor = this.limit - v_3;
                  break lab3;
                }
                this.bra = this.cursor;
                if (!this.r_R2()) {
                  this.cursor = this.limit - v_3;
                  break lab3;
                }
                if (!this.slice_del()) {
                  return false;
                }
                break;
              case 2:
                var lab4 = true;
                lab4: while (lab4 == true) {
                  lab4 = false;
                  v_4 = this.limit - this.cursor;
                  let lab5 = true;
                  while (lab5 == true) {
                    lab5 = false;
                    if (!this.r_R2()) {
                      break;
                    }
                    if (!this.slice_del()) {
                      return false;
                    }
                    break lab4;
                  }
                  this.cursor = this.limit - v_4;
                  if (!this.r_R1()) {
                    this.cursor = this.limit - v_3;
                    break lab3;
                  }
                  if (!this.slice_from("eux")) {
                    return false;
                  }
                }
                break;
              case 3:
                if (!this.r_R2()) {
                  this.cursor = this.limit - v_3;
                  break lab3;
                }
                if (!this.slice_del()) {
                  return false;
                }
                break;
              case 4:
                if (!this.r_RV()) {
                  this.cursor = this.limit - v_3;
                  break lab3;
                }
                if (!this.slice_from("i")) {
                  return false;
                }
                break;
            }
          }
          break;
        case 7:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          v_5 = this.limit - this.cursor;
          var lab6 = true;
          lab6: while (lab6 == true) {
            lab6 = false;
            this.ket = this.cursor;
            among_var = this.find_among_b(StemmerFr.a_3, 3);
            if (among_var == 0) {
              this.cursor = this.limit - v_5;
              break;
            }
            this.bra = this.cursor;
            switch (among_var) {
              case 0:
                this.cursor = this.limit - v_5;
                break lab6;
              case 1:
                var lab7 = true;
                lab7: while (lab7 == true) {
                  lab7 = false;
                  v_6 = this.limit - this.cursor;
                  let lab8 = true;
                  while (lab8 == true) {
                    lab8 = false;
                    if (!this.r_R2()) {
                      break;
                    }
                    if (!this.slice_del()) {
                      return false;
                    }
                    break lab7;
                  }
                  this.cursor = this.limit - v_6;
                  if (!this.slice_from("abl")) {
                    return false;
                  }
                }
                break;
              case 2:
                var lab9 = true;
                lab9: while (lab9 == true) {
                  lab9 = false;
                  v_7 = this.limit - this.cursor;
                  let lab10 = true;
                  while (lab10 == true) {
                    lab10 = false;
                    if (!this.r_R2()) {
                      break;
                    }
                    if (!this.slice_del()) {
                      return false;
                    }
                    break lab9;
                  }
                  this.cursor = this.limit - v_7;
                  if (!this.slice_from("iqU")) {
                    return false;
                  }
                }
                break;
              case 3:
                if (!this.r_R2()) {
                  this.cursor = this.limit - v_5;
                  break lab6;
                }
                if (!this.slice_del()) {
                  return false;
                }
                break;
            }
          }
          break;
        case 8:
          if (!this.r_R2()) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          v_8 = this.limit - this.cursor;
          var lab11 = true;
          while (lab11 == true) {
            lab11 = false;
            this.ket = this.cursor;
            if (!this.eq_s_b(2, "at")) {
              this.cursor = this.limit - v_8;
              break;
            }
            this.bra = this.cursor;
            if (!this.r_R2()) {
              this.cursor = this.limit - v_8;
              break;
            }
            if (!this.slice_del()) {
              return false;
            }
            this.ket = this.cursor;
            if (!this.eq_s_b(2, "ic")) {
              this.cursor = this.limit - v_8;
              break;
            }
            this.bra = this.cursor;
            let lab12 = true;
            lab12: while (lab12 == true) {
              lab12 = false;
              v_9 = this.limit - this.cursor;
              let lab13 = true;
              while (lab13 == true) {
                lab13 = false;
                if (!this.r_R2()) {
                  break;
                }
                if (!this.slice_del()) {
                  return false;
                }
                break lab12;
              }
              this.cursor = this.limit - v_9;
              if (!this.slice_from("iqU")) {
                return false;
              }
            }
          }
          break;
        case 9:
          if (!this.slice_from("eau")) {
            return false;
          }
          break;
        case 10:
          if (!this.r_R1()) {
            return false;
          }
          if (!this.slice_from("al")) {
            return false;
          }
          break;
        case 11:
          var lab14 = true;
          lab14: while (lab14 == true) {
            lab14 = false;
            v_10 = this.limit - this.cursor;
            let lab15 = true;
            while (lab15 == true) {
              lab15 = false;
              if (!this.r_R2()) {
                break;
              }
              if (!this.slice_del()) {
                return false;
              }
              break lab14;
            }
            this.cursor = this.limit - v_10;
            if (!this.r_R1()) {
              return false;
            }
            if (!this.slice_from("eux")) {
              return false;
            }
          }
          break;
        case 12:
          if (!this.r_R1()) {
            return false;
          }
          if (!this.out_grouping_b(StemmerFr.g_v, 97, 251)) {
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 13:
          if (!this.r_RV()) {
            return false;
          }
          if (!this.slice_from("ant")) {
            return false;
          }
          return false;
        case 14:
          if (!this.r_RV()) {
            return false;
          }
          if (!this.slice_from("ent")) {
            return false;
          }
          return false;
        case 15:
          v_11 = this.limit - this.cursor;
          if (!this.in_grouping_b(StemmerFr.g_v, 97, 251)) {
            return false;
          }
          if (!this.r_RV()) {
            return false;
          }
          this.cursor = this.limit - v_11;
          if (!this.slice_del()) {
            return false;
          }
          return false;
      }
      return true;
    }
    r_i_verb_suffix() {
      let among_var;
      let v_1;
      let v_2;
      v_1 = this.limit - this.cursor;
      if (this.cursor < this.I_pV) {
        return false;
      }
      this.cursor = this.I_pV;
      v_2 = this.limit_backward;
      this.limit_backward = this.cursor;
      this.cursor = this.limit - v_1;
      this.ket = this.cursor;
      among_var = this.find_among_b(StemmerFr.a_5, 35);
      if (among_var == 0) {
        this.limit_backward = v_2;
        return false;
      }
      this.bra = this.cursor;
      switch (among_var) {
        case 0:
          this.limit_backward = v_2;
          return false;
        case 1:
          if (!this.out_grouping_b(StemmerFr.g_v, 97, 251)) {
            this.limit_backward = v_2;
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
      }
      this.limit_backward = v_2;
      return true;
    }
    r_verb_suffix() {
      let among_var;
      let v_1;
      let v_2;
      let v_3;
      v_1 = this.limit - this.cursor;
      if (this.cursor < this.I_pV) {
        return false;
      }
      this.cursor = this.I_pV;
      v_2 = this.limit_backward;
      this.limit_backward = this.cursor;
      this.cursor = this.limit - v_1;
      this.ket = this.cursor;
      among_var = this.find_among_b(StemmerFr.a_6, 38);
      if (among_var == 0) {
        this.limit_backward = v_2;
        return false;
      }
      this.bra = this.cursor;
      switch (among_var) {
        case 0:
          this.limit_backward = v_2;
          return false;
        case 1:
          if (!this.r_R2()) {
            this.limit_backward = v_2;
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 2:
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 3:
          if (!this.slice_del()) {
            return false;
          }
          v_3 = this.limit - this.cursor;
          var lab0 = true;
          while (lab0 == true) {
            lab0 = false;
            this.ket = this.cursor;
            if (!this.eq_s_b(1, "e")) {
              this.cursor = this.limit - v_3;
              break;
            }
            this.bra = this.cursor;
            if (!this.slice_del()) {
              return false;
            }
          }
          break;
      }
      this.limit_backward = v_2;
      return true;
    }
    r_residual_suffix() {
      let among_var;
      let v_1;
      let v_2;
      let v_3;
      let v_4;
      let v_5;
      v_1 = this.limit - this.cursor;
      let lab0 = true;
      while (lab0 == true) {
        lab0 = false;
        this.ket = this.cursor;
        if (!this.eq_s_b(1, "s")) {
          this.cursor = this.limit - v_1;
          break;
        }
        this.bra = this.cursor;
        v_2 = this.limit - this.cursor;
        if (!this.out_grouping_b(StemmerFr.g_keep_with_s, 97, 232)) {
          this.cursor = this.limit - v_1;
          break;
        }
        this.cursor = this.limit - v_2;
        if (!this.slice_del()) {
          return false;
        }
      }
      v_3 = this.limit - this.cursor;
      if (this.cursor < this.I_pV) {
        return false;
      }
      this.cursor = this.I_pV;
      v_4 = this.limit_backward;
      this.limit_backward = this.cursor;
      this.cursor = this.limit - v_3;
      this.ket = this.cursor;
      among_var = this.find_among_b(StemmerFr.a_7, 7);
      if (among_var == 0) {
        this.limit_backward = v_4;
        return false;
      }
      this.bra = this.cursor;
      switch (among_var) {
        case 0:
          this.limit_backward = v_4;
          return false;
        case 1:
          if (!this.r_R2()) {
            this.limit_backward = v_4;
            return false;
          }
          var lab1 = true;
          lab1: while (lab1 == true) {
            lab1 = false;
            v_5 = this.limit - this.cursor;
            let lab2 = true;
            while (lab2 == true) {
              lab2 = false;
              if (!this.eq_s_b(1, "s")) {
                break;
              }
              break lab1;
            }
            this.cursor = this.limit - v_5;
            if (!this.eq_s_b(1, "t")) {
              this.limit_backward = v_4;
              return false;
            }
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 2:
          if (!this.slice_from("i")) {
            return false;
          }
          break;
        case 3:
          if (!this.slice_del()) {
            return false;
          }
          break;
        case 4:
          if (!this.eq_s_b(2, "gu")) {
            this.limit_backward = v_4;
            return false;
          }
          if (!this.slice_del()) {
            return false;
          }
          break;
      }
      this.limit_backward = v_4;
      return true;
    }
    r_un_double() {
      let v_1;
      v_1 = this.limit - this.cursor;
      if (this.find_among_b(StemmerFr.a_8, 5) == 0) {
        return false;
      }
      this.cursor = this.limit - v_1;
      this.ket = this.cursor;
      if (this.cursor <= this.limit_backward) {
        return false;
      }
      this.cursor--;
      this.bra = this.cursor;
      if (!this.slice_del()) {
        return false;
      }
      return true;
    }
    r_un_accent() {
      let v_3;
      {
        let v_1 = 1;
        replab0: while (true) {
          let lab1 = true;
          while (lab1 == true) {
            lab1 = false;
            if (!this.out_grouping_b(StemmerFr.g_v, 97, 251)) {
              break;
            }
            v_1--;
            continue replab0;
          }
          break;
        }
        if (v_1 > 0) {
          return false;
        }
      }
      this.ket = this.cursor;
      let lab2 = true;
      lab2: while (lab2 == true) {
        lab2 = false;
        v_3 = this.limit - this.cursor;
        let lab3 = true;
        while (lab3 == true) {
          lab3 = false;
          if (!this.eq_s_b(1, "é")) {
            break;
          }
          break lab2;
        }
        this.cursor = this.limit - v_3;
        if (!this.eq_s_b(1, "è")) {
          return false;
        }
      }
      this.bra = this.cursor;
      if (!this.slice_from("e")) {
        return false;
      }
      return true;
    }
    innerStem() {
      let v_1;
      let v_2;
      let v_3;
      let v_4;
      let v_5;
      let v_6;
      let v_7;
      let v_8;
      let v_9;
      let v_10;
      let v_11;
      v_1 = this.cursor;
      let lab0 = true;
      while (lab0 == true) {
        lab0 = false;
        if (!this.r_prelude()) {
          break;
        }
      }
      this.cursor = v_1;
      v_2 = this.cursor;
      let lab1 = true;
      while (lab1 == true) {
        lab1 = false;
        if (!this.r_mark_regions()) {
          break;
        }
      }
      this.cursor = v_2;
      this.limit_backward = this.cursor;
      this.cursor = this.limit;
      v_3 = this.limit - this.cursor;
      let lab2 = true;
      lab2: while (lab2 == true) {
        lab2 = false;
        let lab3 = true;
        lab3: while (lab3 == true) {
          lab3 = false;
          v_4 = this.limit - this.cursor;
          let lab4 = true;
          lab4: while (lab4 == true) {
            lab4 = false;
            v_5 = this.limit - this.cursor;
            let lab5 = true;
            lab5: while (lab5 == true) {
              lab5 = false;
              v_6 = this.limit - this.cursor;
              let lab6 = true;
              while (lab6 == true) {
                lab6 = false;
                if (!this.r_standard_suffix()) {
                  break;
                }
                break lab5;
              }
              this.cursor = this.limit - v_6;
              let lab7 = true;
              while (lab7 == true) {
                lab7 = false;
                if (!this.r_i_verb_suffix()) {
                  break;
                }
                break lab5;
              }
              this.cursor = this.limit - v_6;
              if (!this.r_verb_suffix()) {
                break lab4;
              }
            }
            this.cursor = this.limit - v_5;
            v_7 = this.limit - this.cursor;
            let lab8 = true;
            lab8: while (lab8 == true) {
              lab8 = false;
              this.ket = this.cursor;
              let lab9 = true;
              lab9: while (lab9 == true) {
                lab9 = false;
                v_8 = this.limit - this.cursor;
                let lab10 = true;
                while (lab10 == true) {
                  lab10 = false;
                  if (!this.eq_s_b(1, "Y")) {
                    break;
                  }
                  this.bra = this.cursor;
                  if (!this.slice_from("i")) {
                    return false;
                  }
                  break lab9;
                }
                this.cursor = this.limit - v_8;
                if (!this.eq_s_b(1, "ç")) {
                  this.cursor = this.limit - v_7;
                  break lab8;
                }
                this.bra = this.cursor;
                if (!this.slice_from("c")) {
                  return false;
                }
              }
            }
            break lab3;
          }
          this.cursor = this.limit - v_4;
          if (!this.r_residual_suffix()) {
            break lab2;
          }
        }
      }
      this.cursor = this.limit - v_3;
      v_9 = this.limit - this.cursor;
      let lab11 = true;
      while (lab11 == true) {
        lab11 = false;
        if (!this.r_un_double()) {
          break;
        }
      }
      this.cursor = this.limit - v_9;
      v_10 = this.limit - this.cursor;
      let lab12 = true;
      while (lab12 == true) {
        lab12 = false;
        if (!this.r_un_accent()) {
          break;
        }
      }
      this.cursor = this.limit - v_10;
      this.cursor = this.limit_backward;
      v_11 = this.cursor;
      let lab13 = true;
      while (lab13 == true) {
        lab13 = false;
        if (!this.r_postlude()) {
          break;
        }
      }
      this.cursor = v_11;
      return true;
    }
  }
  StemmerFr.methodObject = new StemmerFr();
  StemmerFr.a_0 = [
    new Among("col", -1, -1),
    new Among("par", -1, -1),
    new Among("tap", -1, -1)
  ];
  StemmerFr.a_1 = [
    new Among("", -1, 4),
    new Among("I", 0, 1),
    new Among("U", 0, 2),
    new Among("Y", 0, 3)
  ];
  StemmerFr.a_2 = [
    new Among("iqU", -1, 3),
    new Among("abl", -1, 3),
    new Among("Ièr", -1, 4),
    new Among("ièr", -1, 4),
    new Among("eus", -1, 2),
    new Among("iv", -1, 1)
  ];
  StemmerFr.a_3 = [
    new Among("ic", -1, 2),
    new Among("abil", -1, 1),
    new Among("iv", -1, 3)
  ];
  StemmerFr.a_4 = [
    new Among("iqUe", -1, 1),
    new Among("atrice", -1, 2),
    new Among("ance", -1, 1),
    new Among("ence", -1, 5),
    new Among("logie", -1, 3),
    new Among("able", -1, 1),
    new Among("isme", -1, 1),
    new Among("euse", -1, 11),
    new Among("iste", -1, 1),
    new Among("ive", -1, 8),
    new Among("if", -1, 8),
    new Among("usion", -1, 4),
    new Among("ation", -1, 2),
    new Among("ution", -1, 4),
    new Among("ateur", -1, 2),
    new Among("iqUes", -1, 1),
    new Among("atrices", -1, 2),
    new Among("ances", -1, 1),
    new Among("ences", -1, 5),
    new Among("logies", -1, 3),
    new Among("ables", -1, 1),
    new Among("ismes", -1, 1),
    new Among("euses", -1, 11),
    new Among("istes", -1, 1),
    new Among("ives", -1, 8),
    new Among("ifs", -1, 8),
    new Among("usions", -1, 4),
    new Among("ations", -1, 2),
    new Among("utions", -1, 4),
    new Among("ateurs", -1, 2),
    new Among("ments", -1, 15),
    new Among("ements", 30, 6),
    new Among("issements", 31, 12),
    new Among("ités", -1, 7),
    new Among("ment", -1, 15),
    new Among("ement", 34, 6),
    new Among("issement", 35, 12),
    new Among("amment", 34, 13),
    new Among("emment", 34, 14),
    new Among("aux", -1, 10),
    new Among("eaux", 39, 9),
    new Among("eux", -1, 1),
    new Among("ité", -1, 7)
  ];
  StemmerFr.a_5 = [
    new Among("ira", -1, 1),
    new Among("ie", -1, 1),
    new Among("isse", -1, 1),
    new Among("issante", -1, 1),
    new Among("i", -1, 1),
    new Among("irai", 4, 1),
    new Among("ir", -1, 1),
    new Among("iras", -1, 1),
    new Among("ies", -1, 1),
    new Among("îmes", -1, 1),
    new Among("isses", -1, 1),
    new Among("issantes", -1, 1),
    new Among("îtes", -1, 1),
    new Among("is", -1, 1),
    new Among("irais", 13, 1),
    new Among("issais", 13, 1),
    new Among("irions", -1, 1),
    new Among("issions", -1, 1),
    new Among("irons", -1, 1),
    new Among("issons", -1, 1),
    new Among("issants", -1, 1),
    new Among("it", -1, 1),
    new Among("irait", 21, 1),
    new Among("issait", 21, 1),
    new Among("issant", -1, 1),
    new Among("iraIent", -1, 1),
    new Among("issaIent", -1, 1),
    new Among("irent", -1, 1),
    new Among("issent", -1, 1),
    new Among("iront", -1, 1),
    new Among("ît", -1, 1),
    new Among("iriez", -1, 1),
    new Among("issiez", -1, 1),
    new Among("irez", -1, 1),
    new Among("issez", -1, 1)
  ];
  StemmerFr.a_6 = [
    new Among("a", -1, 3),
    new Among("era", 0, 2),
    new Among("asse", -1, 3),
    new Among("ante", -1, 3),
    new Among("ée", -1, 2),
    new Among("ai", -1, 3),
    new Among("erai", 5, 2),
    new Among("er", -1, 2),
    new Among("as", -1, 3),
    new Among("eras", 8, 2),
    new Among("âmes", -1, 3),
    new Among("asses", -1, 3),
    new Among("antes", -1, 3),
    new Among("âtes", -1, 3),
    new Among("ées", -1, 2),
    new Among("ais", -1, 3),
    new Among("erais", 15, 2),
    new Among("ions", -1, 1),
    new Among("erions", 17, 2),
    new Among("assions", 17, 3),
    new Among("erons", -1, 2),
    new Among("ants", -1, 3),
    new Among("és", -1, 2),
    new Among("ait", -1, 3),
    new Among("erait", 23, 2),
    new Among("ant", -1, 3),
    new Among("aIent", -1, 3),
    new Among("eraIent", 26, 2),
    new Among("èrent", -1, 2),
    new Among("assent", -1, 3),
    new Among("eront", -1, 2),
    new Among("ât", -1, 3),
    new Among("ez", -1, 2),
    new Among("iez", 32, 2),
    new Among("eriez", 33, 2),
    new Among("assiez", 33, 3),
    new Among("erez", 32, 2),
    new Among("é", -1, 2)
  ];
  StemmerFr.a_7 = [
    new Among("e", -1, 3),
    new Among("Ière", 0, 2),
    new Among("ière", 0, 2),
    new Among("ion", -1, 1),
    new Among("Ier", -1, 2),
    new Among("ier", -1, 2),
    new Among("ë", -1, 4)
  ];
  StemmerFr.a_8 = [
    new Among("ell", -1, -1),
    new Among("eill", -1, -1),
    new Among("enn", -1, -1),
    new Among("onn", -1, -1),
    new Among("ett", -1, -1)
  ];
  StemmerFr.g_v = [
    17,
    65,
    16,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    128,
    130,
    103,
    8,
    5
  ];
  StemmerFr.g_keep_with_s = [
    1,
    65,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    128
  ];
  stemmerFr = StemmerFr;
  return stemmerFr;
}
var stopwordsFr;
var hasRequiredStopwordsFr;
function requireStopwordsFr() {
  if (hasRequiredStopwordsFr) return stopwordsFr;
  hasRequiredStopwordsFr = 1;
  const { Stopwords } = requireSrc$1();
  class StopwordsFr extends Stopwords {
    constructor(container, words2) {
      super(container);
      this.name = "stopwords-fr";
      this.dictionary = {};
      const list = words2 || [
        "être",
        "avoir",
        "faire",
        "a",
        "au",
        "aux",
        "avec",
        "ce",
        "ces",
        "dans",
        "de",
        "des",
        "du",
        "elle",
        "en",
        "et",
        "eux",
        "il",
        "je",
        "la",
        "le",
        "leur",
        "lui",
        "ma",
        "mais",
        "me",
        "même",
        "mes",
        "moi",
        "mon",
        "ne",
        "nos",
        "notre",
        "nous",
        "on",
        "ou",
        "où",
        "par",
        "pas",
        "pour",
        "qu",
        "que",
        "qui",
        "sa",
        "se",
        "ses",
        "son",
        "sur",
        "ta",
        "te",
        "tes",
        "toi",
        "ton",
        "tu",
        "un",
        "une",
        "vos",
        "votre",
        "vous",
        "c",
        "d",
        "j",
        "l",
        "à",
        "m",
        "n",
        "s",
        "t",
        "y",
        "été",
        "étée",
        "étées",
        "étés",
        "étant",
        "suis",
        "es",
        "est",
        "sommes",
        "êtes",
        "sont",
        "serai",
        "seras",
        "sera",
        "serons",
        "serez",
        "seront",
        "serais",
        "serait",
        "serions",
        "seriez",
        "seraient",
        "étais",
        "était",
        "étions",
        "étiez",
        "étaient",
        "fus",
        "fut",
        "fûmes",
        "fûtes",
        "furent",
        "sois",
        "soit",
        "soyons",
        "soyez",
        "soient",
        "fusse",
        "fusses",
        "fût",
        "fussions",
        "fussiez",
        "fussent",
        "ayant",
        "eu",
        "eue",
        "eues",
        "eus",
        "ai",
        "as",
        "avons",
        "avez",
        "ont",
        "aurai",
        "auras",
        "aura",
        "aurons",
        "aurez",
        "auront",
        "aurais",
        "aurait",
        "aurions",
        "auriez",
        "auraient",
        "avais",
        "avait",
        "avions",
        "aviez",
        "avaient",
        "eut",
        "eûmes",
        "eûtes",
        "eurent",
        "aie",
        "aies",
        "ait",
        "ayons",
        "ayez",
        "aient",
        "eusse",
        "eusses",
        "eût",
        "eussions",
        "eussiez",
        "eussent",
        "ceci",
        "cela",
        "cet",
        "cette",
        "ici",
        "ils",
        "les",
        "leurs",
        "quel",
        "quels",
        "quelle",
        "quelles",
        "sans",
        "soi"
      ];
      this.build(list);
    }
  }
  stopwordsFr = StopwordsFr;
  return stopwordsFr;
}
var normalizerFr;
var hasRequiredNormalizerFr;
function requireNormalizerFr() {
  if (hasRequiredNormalizerFr) return normalizerFr;
  hasRequiredNormalizerFr = 1;
  const { Normalizer } = requireSrc$1();
  class NormalizerFr extends Normalizer {
    constructor(container) {
      super(container);
      this.name = "normalizer-fr";
    }
    normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    run(srcInput) {
      const input = srcInput;
      input.text = this.normalize(input.text, input);
      return input;
    }
  }
  normalizerFr = NormalizerFr;
  return normalizerFr;
}
const abandon = -0.3;
const abandonne = -0.3;
const abasourd = 0.24;
const abattu = -0.12;
const abattus = -0.12;
const aberr = 0;
const abomin = -0.9;
const abond = 0;
const abord = 0.15;
const abracadabr = -0.18;
const abrut = -0.28;
const absent = -0.1;
const absolu = 0.25;
const absolus = 0;
const absorb = 0.3;
const absorbe = 0.3;
const abstrait = 0;
const absurd = 0.4;
const abus = -0.2;
const acariatr = 0.2;
const accabl = -0.15;
const accable = -0.15;
const accept = 0.05;
const accessibl = 0.13;
const accident = -0.04;
const accidente = -0.04;
const accol = 0;
const accole = 0;
const accommod = 0.45;
const accompl = 0.4;
const accort = 0.23;
const accueil = 0.4;
const acerb = -0.15;
const acharn = 0.2;
const acharne = 0.2;
const achev = 0.07;
const acheve = 0.07;
const acidul = -0.1;
const acidule = -0.1;
const actif = 0.1;
const activ = -0.1;
const actuel = 0.1;
const additionnel = 0.05;
const adjacent = 0.03;
const administr = 0;
const admir = 0.7;
const adolescent = 0.16;
const ador = 0.5;
const adroit = 0.23;
const adul = 0.27;
const adventic = 0.05;
const advers = -0.35;
const adequat = 0;
const affabl = 0.31;
const affectu = 0.4;
const affil = 0.1;
const affile = 0.1;
const afflig = -0.15;
const afflige = -0.15;
const affol = -0.5;
const affole = -0.5;
const affreux = -0.8;
const africain = 0;
const agac = -0.25;
const agiss = 0.2;
const agit = 0.1;
const agite = 0.1;
const agress = -0.8;
const agreabl = 0.7;
const ahur = 0.15;
const aigr = -0.3;
const aigu = 0.2;
const aiguis = 0.1;
const aiguise = 0.1;
const aigus = 0.2;
const aimabl = 0.9;
const aim = 0.4;
const aime = 0.4;
const ajout = 0.05;
const ajoute = 0.05;
const ajust = 0;
const ajuste = 0;
const alarm = -0.2;
const algerien = 0;
const allemand = 0;
const allogen = -0.1;
const allong = 0;
const allonge = 0;
const allum = 0.3;
const allume = 0.3;
const allegr = 0.25;
const altruist = 0.35;
const alter = -0.4;
const altere = -0.4;
const aleatoir = -0.05;
const amaigr = -0.1;
const ambi = 0;
const ambigu = -0.05;
const ambigus = -0.05;
const amer = -0.6;
const ami = 0.75;
const amical = 0.5;
const amis = 0.75;
const amour = 0.55;
const ample = 0.1;
const amus = 0.4;
const amelior = 0.27;
const ameliore = 0.27;
const americain = 0.08;
const amerindien = 0.04;
const amethyst = 0;
const analog = 0;
const analogu = 0.02;
const ancestral = 0.05;
const ancien = 0.04;
const android = 0.11;
const anglais = 0.07;
const angoiss = -0.05;
const angoisse = -0.05;
const angel = 0.05;
const anhydr = -0.12;
const animal = -0.3;
const annex = 0;
const annexe = 0;
const anodin = -0.08;
const anonym = -0.1;
const anormal = -0.08;
const antagon = -0.35;
const anthropoid = 0.11;
const anticapital = -0.11;
const antiqu = 0.1;
const anterieur = 0;
const anxieux = -0.1;
const apeur = -0.05;
const apeure = -0.05;
const aphas = -0.05;
const aplat = -0.14;
const apparent = 0.1;
const appliqu = 0.22;
const applique = 0.22;
const approch = 0;
const approche = 0;
const appropr = 0;
const approprie = 0;
const approxim = 0;
const appreci = 0.03;
const apprec = 0.4;
const arab = 0;
const arachneen = 0.09;
const ardent = 0.5;
const argent = 0;
const argente = 0;
const aristocrat = 0.15;
const arme = -0.2;
const arriv = 0.1;
const arrive = 0.1;
const arrier = -0.18;
const arriere = -0.18;
const arrond = -0.15;
const arret = -0.1;
const arrete = -0.1;
const artificiel = -0.1;
const artist = 0.1;
const assembl = 0;
const assidu = 0.02;
const assidus = 0.02;
const assis = 0;
const assoup = 0;
const assujet = 0.05;
const assur = 0.2;
const assure = 0.2;
const astral = 0.05;
const astronom = 0.11;
const astuci = 0.45;
const athlet = 0.21;
const atroc = -0.9;
const atrocit = -0.5;
const attach = 0.23;
const attard = 0;
const attarde = 0;
const atten = 0.03;
const attent = 0.6;
const attention = 0.45;
const attentionne = 0.45;
const attir = 0.31;
const attitr = -0.09;
const attitre = -0.09;
const attrist = -0.15;
const attriste = -0.15;
const atyp = 0.1;
const aubergin = 0;
const audaci = 0.01;
const audibl = 0;
const august = 0.28;
const auster = -0.1;
const authent = 0.3;
const autonom = 0.23;
const autoris = 0.05;
const autorise = 0.05;
const autoritair = -0.11;
const autr = -0.1;
const avanc = 0.3;
const avance = 0.3;
const avantag = 0.1;
const avar = -0.4;
const avarie = -0.4;
const aven = 0.4;
const aventur = -0.28;
const aveugl = -0.3;
const avid = 0.4;
const azimut = -0.01;
const aerien = 0;
const ain = 0;
const aine = 0;
const bagarreur = -0.1;
const bagarr = -0.1;
const balist = 0;
const balourd = -0.24;
const banal = -0.3;
const bancal = -0.1;
const barbar = -0.7;
const bas = -0.2;
const basan = 0;
const basane = 0;
const bass = -0.2;
const batailleur = -0.4;
const bataill = -0.4;
const batt = -0.2;
const battu = -0.3;
const battus = -0.3;
const bavard = -0.3;
const beau = 0.8;
const beaucoup = 0.1;
const bel = 0.8;
const belg = 0;
const belliger = -0.1;
const belliqu = -0.23;
const besogn = -0.34;
const bien = 0;
const bienfais = 0.35;
const bienheur = 0.35;
const biens = 0;
const bienveil = 0.38;
const bijou = 0.3;
const biscornu = -0.2;
const biscornus = -0.2;
const bistr = 0;
const bizarr = -0.4;
const blafard = -0.1;
const blanc = 0.05;
const blanch = 0.05;
const bless = -0.4;
const blesse = -0.4;
const bleu = 0.04;
const bleus = 0.04;
const bleut = 0.02;
const bleute = 0.02;
const bleuatr = 0.02;
const blond = 0.03;
const blamabl = -0.12;
const blem = -0.4;
const bon = 0.7;
const bonheur = 0.5;
const bonhomm = 0.35;
const boudin = -0.15;
const boudine = -0.15;
const boueux = -0.2;
const bouff = 0;
const bouffon = 0.26;
const bouill = 0;
const bourgeois = -0.1;
const bourr = 0.14;
const bourre = 0.14;
const brav = 0.6;
const bref = 0.08;
const breton = 0;
const brill = 0.65;
const bris = -0.4;
const brise = -0.4;
const britann = 0.07;
const british = 0.03;
const brun = 0;
const brusqu = -0.5;
const brutal = -0.6;
const brui = -0.2;
const brev = 0.08;
const brul = -0.1;
const brule = -0.1;
const burin = 0.2;
const burine = 0.2;
const burlesqu = -0.2;
const byzantin = 0;
const be = 0;
const bet = -0.5;
const cabalist = 0.24;
const cach = 0.2;
const cache = 0.2;
const cadeau = 0.45;
const cagneux = -0.1;
const calcin = 0;
const calcine = 0;
const calcul = 0;
const calm = 0.17;
const camard = -0.14;
const candid = 0.05;
const capabl = 0.35;
const capital = 0.2;
const capiton = 0;
const capitonne = 0;
const captif = -0.15;
const captiv = -0.15;
const carmin = 0.01;
const carr = 0;
const carre = 0;
const cass = -0.4;
const casse = -0.4;
const catastroph = -0.5;
const cathol = -0.1;
const cavali = 0.23;
const cavalier = 0.23;
const cavern = -0.25;
const cendr = -0.09;
const cendre = -0.09;
const cens = -0.1;
const cense = -0.1;
const central = 0.05;
const certain = 0.29;
const chaleur = 0.3;
const chang = -0.05;
const change = -0.05;
const charit = 0.35;
const charm = 0.55;
const charnel = 0.1;
const charnu = -0.17;
const charnus = -0.17;
const chast = 0.05;
const chatoi = 0.2;
const chaud = 0.25;
const chauv = -0.1;
const cher = 0.5;
const chic = -0.3;
const chimer = -0.05;
const chinois = 0;
const chois = 0.1;
const chouet = 0.6;
const chroniqu = -0.01;
const chretien = 0;
const cherot = -0.11;
const chetif = -0.08;
const chetiv = -0.08;
const cingl = -0.01;
const cingle = -0.01;
const cinoqu = -0.01;
const cinquiem = 0;
const cinet = 0;
const circonspect = -0.01;
const circulair = 0;
const cireux = -0.03;
const cisel = 0.2;
const cisele = 0.2;
const civil = 0.1;
const civilis = 0.05;
const civilise = 0.05;
const clair = 0.28;
const clandestin = -0.1;
const classiqu = 0.7;
const clos = -0.1;
const clerical = 0;
const coc = -0.1;
const coeur = 0.2;
const coll = -0.03;
const collect = 0.2;
const collegial = 0.1;
const colonial = 0;
const color = 0;
const colore = 0;
const colossal = 0;
const coler = -0.27;
const combat = -0.25;
const combatt = -0.2;
const combl = 0.27;
const comble = 0.27;
const comiqu = 0.4;
const commenc = 0.15;
const commercial = 0;
const commod = 0.3;
const commun = 0.08;
const communautair = 0.07;
const compact = 0.1;
const compar = 0;
const complet = 0.43;
const complex = -0.05;
const complexe = -0.05;
const complic = 0.38;
const compliqu = -0.4;
const complique = -0.4;
const composit = 0;
const compress = -0.15;
const compresse = -0.15;
const comprim = -0.14;
const comprime = -0.14;
const comprehensibl = 0.09;
const con = -0.7;
const concentr = 0.3;
const concentre = 0.3;
const conc = -0.1;
const concis = -0.1;
const conclu = 0;
const concret = 0.25;
const condescend = 0.02;
const confessionnel = 0;
const confi = 0.3;
const confidentiel = 0.04;
const confin = -0.12;
const confine = -0.12;
const confondu = 0.24;
const confondus = 0.24;
const conform = 0.1;
const confort = 0.3;
const confus = -0.4;
const conjugal = 0;
const conner = -0.7;
const connu = 0.6;
const connus = 0.6;
const conscienci = 0;
const conscient = 0.1;
const conseil = 0.2;
const consider = 0.1;
const consign = 0;
const consigne = 0;
const consist = 0.08;
const constern = -0.17;
const consterne = -0.17;
const consequent = 0;
const contemporain = 0.07;
const content = 0.65;
const contest = -0.05;
const continental = 0.01;
const contingent = 0;
const continu = 0;
const continus = 0;
const contract = -0.22;
const contracte = -0.22;
const contradictoir = -0.05;
const contrair = -0.1;
const contrari = -0.25;
const contr = -0.2;
const contrit = -0.2;
const convaincu = 0.1;
const convaincus = 0.1;
const conven = 0.2;
const cordial = 0.25;
const coriac = -0.11;
const corpulent = 0;
const correct = 0.4;
const corrig = 0.27;
const corrige = 0.27;
const corrompu = -0.4;
const corrompus = -0.4;
const cosmiqu = 0.1;
const cosmopolit = 0.17;
const costaud = 0.21;
const coton = -0.1;
const couch = -0.2;
const couche = -0.2;
const coupabl = -0.25;
const coup = 0;
const coupe = 0;
const courag = 0.5;
const cour = 0.1;
const courb = -0.03;
const court = -0.1;
const courtois = 0.2;
const coutumi = 0;
const coutumier = 0;
const couteux = -0.11;
const craintif = -0.05;
const craintiv = -0.05;
const cramois = 0.01;
const crasseux = -0.4;
const crayeux = -0.03;
const creus = -0.5;
const creux = -0.5;
const cri = 0.05;
const criminel = -0.1;
const cristallin = 0.15;
const critiqu = 0;
const crois = -0.5;
const croise = -0.5;
const croul = 0;
const croustill = -0.15;
const cru = -0.3;
const crucial = 0.08;
const cruel = -0.4;
const crus = -0.3;
const credul = 0.05;
const cretin = -0.35;
const cuis = 0;
const cuit = 0;
const culturel = 0.1;
const cuprifer = 0.1;
const cupriqu = 0.1;
const curieux = 0.07;
const cyclopeen = 0.08;
const celest = 0.24;
const celebr = 0.15;
const ceruleen = 0.02;
const cerebral = 0.05;
const emot = 0.4;
const danger = -0.55;
const dantesqu = -0.2;
const dem = -0.05;
const dens = 0;
const derni = -0.29;
const dernier = -0.29;
const deuxiem = 0.03;
const difficil = -0.5;
const difform = -0.35;
const different = 0.4;
const dign = 0.5;
const dingu = -0.2;
const diplomat = 0;
const direct = 0.2;
const dirig = -0.05;
const discord = 0.2;
const discret = 0;
const discut = -0.05;
const disgraci = -0.35;
const disparat = 0.1;
const disparu = -0.14;
const disparus = -0.14;
const dispendi = -0.11;
const disponibl = 0.1;
const dissembl = 0.08;
const dissimul = 0.1;
const dissimule = 0.1;
const dist = -0.05;
const distinct = 0;
const distingu = 0.2;
const distingue = 0.2;
const distr = -0.6;
const distrait = -0.6;
const diurn = 0;
const diver = 0;
const divers = 0;
const divin = 0.55;
const docil = -0.1;
const domest = 0;
const domin = 0.3;
const dommag = -0.3;
const don = 0.1;
const donne = 0.1;
const dorm = 0;
const dormeur = 0;
const dormeux = 0;
const dor = 0.2;
const dore = 0.2;
const doubl = 0;
const douc = 0.4;
const doucer = 0.2;
const doulour = -0.55;
const douteux = -0.1;
const doux = 0.4;
const draconien = 0.16;
const dramat = -0.2;
const dress = 0;
const dresse = 0;
const droit = 0.17;
const dru = 0;
const drus = 0;
const drol = 0.53;
const dur = -0.21;
const duvet = 0.1;
const dynam = 0;
const debil = -0.5;
const debonnair = 0;
const debut = 0.15;
const decent = 0;
const decept = -0.5;
const decharn = -0.1;
const decharne = -0.1;
const dechir = -0.3;
const dechire = -0.3;
const decid = 0.1;
const decide = 0.1;
const decis = 0.2;
const deconcert = 0.28;
const deconcerte = 0.28;
const deconf = -0.2;
const deconfit = -0.2;
const decoupl = 0.21;
const decouple = 0.21;
const decouvert = 0.1;
const decouvr = 0.1;
const def = -0.1;
const defait = -0.1;
const defavor = -0.35;
const defendu = -0.05;
const defendus = -0.05;
const deficient = -0.19;
const definit = 0;
const deform = -0.1;
const deforme = -0.1;
const degout = -0.43;
const degueul = -1;
const delaiss = -0.12;
const delaisse = -0.12;
const delect = 0.4;
const delicat = 0.25;
const delici = 0.8;
const delictu = -0.06;
const dement = -0.01;
const demerdard = -0.05;
const demesur = 0.14;
const demesure = 0.14;
const demod = -0.08;
const demode = -0.08;
const denud = -0.02;
const denude = -0.02;
const depeupl = -0.13;
const depeuple = -0.13;
const deplais = 0.02;
const deplor = -0.15;
const deraison = 0.2;
const derisoir = -0.5;
const derout = 0.1;
const deregl = -0.2;
const deregle = -0.2;
const desagre = -0.5;
const desarm = -0.33;
const desarme = -0.33;
const desastr = -0.5;
const desax = -0.01;
const desaxe = -0.01;
const desert = -0.14;
const deserte = -0.14;
const desesper = -0.7;
const desespere = -0.7;
const deshabill = 0.08;
const deshabille = 0.08;
const deshydrat = -0.12;
const deshydrate = -0.12;
const desherit = -0.5;
const desherite = -0.5;
const desol = -0.3;
const desole = -0.3;
const detach = -0.1;
const detache = -0.1;
const detaill = 0.2;
const detaille = 0.2;
const detenu = -0.15;
const detenus = -0.15;
const detest = 0;
const devor = 0.5;
const decu = -1;
const decus = -1;
const ecclesiast = 0;
const effect = 0.1;
const efficac = 0.4;
const efficient = 0.2;
const effil = 0.06;
const effile = 0.06;
const efflanqu = -0.1;
const efflanque = -0.1;
const effrai = -0.5;
const effray = -0.5;
const effraye = -0.5;
const effroi = -0.2;
const effemin = 0;
const effemine = 0;
const ellipt = -0.05;
const embarrass = -0.23;
const embarr = -0.5;
const embarrasse = -0.5;
const emberlificot = 0;
const embras = 0.25;
const embrase = 0.25;
const embrouill = -0.2;
const embrouille = -0.2;
const embrum = -0.02;
const embrume = -0.02;
const emmerd = -0.25;
const emprison = -0.15;
const emprisonne = -0.15;
const empat = -0.09;
const empate = -0.09;
const encaiss = 0.13;
const encaisse = 0.13;
const encastr = 0.13;
const encastre = 0.13;
const enceint = 0.1;
const enchant = 0.32;
const enchante = 0.32;
const encrout = -0.15;
const endeuill = -0.32;
const endeuille = -0.32;
const endommag = -0.3;
const endommage = -0.3;
const endorm = 0;
const enfantin = -0.15;
const enflamm = 0.25;
const enflamme = 0.25;
const engourd = -0.11;
const enjou = 0.26;
const enjoue = 0.26;
const ennem = -0.6;
const ennui = -0.7;
const ennuy = -0.7;
const ennuye = -0.7;
const ensangl = -0.2;
const ensanglante = -0.2;
const ensorcel = 0.45;
const entaill = 0;
const entaille = 0;
const entendu = 0;
const entendus = 0;
const enthousiast = 0.8;
const entich = 0.27;
const entiche = 0.27;
const enti = 0.15;
const entier = 0.15;
const entortill = -0.2;
const entortille = -0.2;
const entrouvert = 0;
const envah = -0.25;
const envelopp = 0;
const enveloppe = 0;
const envieux = -0.2;
const envout = 0.45;
const errant = -0.1;
const espagnol = 0;
const espiegl = 0.15;
const essai = -0.05;
const essentiel = 0.3;
const esseul = -0.1;
const esseule = -0.1;
const estim = 0.15;
const europeen = 0;
const exact = 0.25;
const excellent = 0.5;
const exceptionnel = 0.2;
const excess = -0.4;
const excit = -0.15;
const excite = -0.15;
const exclus = -0.03;
const exemplair = 0.3;
const exig = -0.12;
const exist = 0.07;
const exorbit = 0.11;
const exot = 0.1;
const explicit = 0;
const express = 0;
const expre = 0;
const exquis = 0.6;
const extern = 0;
const extraordinair = 0.1;
const extravag = 0.2;
const extrem = -0.3;
const exterieur = 0;
const execr = -0.36;
const fabul = 1;
const facil = 0.27;
const factic = 0.25;
const fad = -0.4;
const faibl = -0.38;
const faisabl = 0;
const fameux = 0.1;
const familial = 0.1;
const famili = 0.2;
const familier = 0.2;
const fantast = 1;
const farouch = -0.6;
const fatal = -0.7;
const fatig = -0.2;
const fatigu = -0.2;
const fatigue = -0.2;
const fauch = -0.34;
const fauche = -0.34;
const fauss = -0.5;
const fauv = 0;
const faux = -0.5;
const favor = 0.3;
const favorit = 0.3;
const femel = 0;
const ferm = -0.28;
const ferme = -0.28;
const fertil = 0.05;
const fessi = 0;
const fessier = 0;
const fichu = -0.25;
const fichus = -0.25;
const fidel = 0.1;
const fi = 0.38;
const fier = 0.38;
const fig = -0.2;
const fige = -0.2;
const fin = -0.1;
const final = -0.5;
const fix = 0.1;
const fievreux = -0.2;
const flagad = -0.1;
const flageol = -0.05;
const flagr = -0.1;
const flamboi = 0.25;
const flegmat = 0.07;
const fleur = 0.1;
const flexibl = 0.05;
const flott = 0;
const flou = -0.2;
const flous = -0.2;
const fluid = 0;
const flaneur = -0.21;
const flaneux = -0.21;
const foll = -0.01;
const fonc = -0.2;
const fonce = -0.2;
const forcen = -0.22;
const forcene = -0.22;
const forc = -0.4;
const force = -0.4;
const formel = -0.12;
const formid = 0.85;
const fort = 0.41;
const fortuit = 0.25;
const fortun = 0.23;
const fortune = 0.23;
const fossil = 0;
const fou = -0.01;
const foudroi = 0.02;
const fouineur = 0.04;
const fouin = 0.04;
const fourr = 0;
const fourre = 0;
const fourvoy = -0.22;
const fourvoye = -0.22;
const fous = -0.01;
const foutais = -0.6;
const foutu = -0.4;
const foutus = -0.4;
const fragil = -0.25;
const frais = 0.3;
const franc = 0.2;
const franch = 0.2;
const franchouillard = 0.1;
const francais = 0.2;
const fraternel = 0.1;
const fraich = 0.3;
const frisquet = 0.15;
const frisson = -0.05;
const fris = 0;
const frise = 0;
const froid = -0.34;
const froiss = -0.4;
const froisse = -0.4;
const fructueux = 0.1;
const frust = 0.1;
const frem = -0.05;
const frequent = 0.1;
const fretill = -0.15;
const frel = -0.1;
const fugit = -0.1;
const fum = 0;
const fume = 0;
const funest = -0.2;
const funebr = -0.6;
const fureteur = 0.04;
const furet = 0.04;
const furibond = -0.22;
const furieux = -0.45;
const furtif = -0.2;
const furtiv = -0.2;
const futur = 0;
const febril = 0.15;
const federal = 0;
const feminin = 0;
const feroc = -0.3;
const gai = 0.5;
const gais = 0.5;
const galop = 0.05;
const gauch = -0.16;
const gaulois = 0.1;
const gentil = 0.4;
const gentill = 0.4;
const gigantesqu = 0.1;
const girond = 0.4;
const glabr = 0.1;
const glacial = -0.2;
const glac = -0.25;
const glace = -0.25;
const glauqu = 0;
const global = 0;
const glorieux = 1;
const glu = -0.1;
const gnangnan = -0.21;
const godich = 0.05;
const gonfl = -0.1;
const gonfle = -0.1;
const gourmand = 0.1;
const gracieux = 0.8;
const grand = 0.3;
const grandios = 0.8;
const gras = -0.35;
const grass = -0.35;
const gratin = -0.2;
const gratuit = 0.1;
const grav = 0.4;
const gravel = -0.15;
const grec = 0;
const grecqu = 0;
const grelott = -0.12;
const gris = -0.18;
const grisatr = -0.1;
const grivois = -0.15;
const gros = 0;
const gross = 0;
const grossi = 0.3;
const grossier = 0.3;
const grotesqu = -0.6;
const guerri = -0.07;
const guerrier = -0.07;
const ge = 0.2;
const genial = 0.9;
const general = 0;
const gener = 0.7;
const gen = -0.3;
const gene = -0.3;
const habil = 0.3;
const habill = 0;
const habille = 0;
const habituel = -0.05;
const hagard = -0.2;
const haineux = -0.38;
const halet = 0.1;
const hard = 0.2;
const hargneux = -0.5;
const hasard = 0.4;
const hasarde = 0.4;
const haut = 0.18;
const hautain = -0.7;
const hellen = 0;
const hermet = 0.04;
const heureux = 0.7;
const hexagonal = 0.1;
const hideux = -0.7;
const hispan = 0;
const histor = 0;
const hierat = 0.17;
const homogen = 0;
const homologu = 0.03;
const honnet = 0.2;
const honor = 0.5;
const honteux = -0.4;
const horizontal = 0;
const horreur = -0.6;
const horribl = -1;
const hostil = -0.7;
const humain = 0.22;
const humanoid = 0.11;
const humbl = -0.2;
const humid = -0.03;
const hyperact = -0.15;
const hypothet = -0.05;
const hebreu = 0;
const hebreux = 0;
const hel = -0.4;
const heroiqu = 0.5;
const hesit = -0.1;
const heteroclit = 0;
const heterogen = 0;
const iber = 0;
const ident = 0;
const idiot = -0.7;
const ideal = 0.8;
const ideau = 0.8;
const ignobl = -0.8;
const ignor = -0.1;
const ignore = -0.1;
const illicit = -0.05;
const illimit = 0.11;
const illimite = 0.11;
const illog = 0.2;
const illustr = 0.2;
const illegal = -0.05;
const imaginair = 0.3;
const imbib = -0.02;
const imbibe = -0.02;
const imbecil = -1;
const immacul = 0.16;
const immacule = 0.16;
const immanqu = -0.35;
const immens = 0.45;
const immigr = -0.1;
const immobil = -0.16;
const immuabl = 0;
const immediat = 0.55;
const immemorial = 0.02;
const impar = -0.35;
const imparf = -0.08;
const imparfait = -0.08;
const impassibl = -0.1;
const impatient = -0.3;
const impavid = 0.08;
const impecc = 0.7;
const impens = 0.02;
const imperceptibl = -0.2;
const impitoi = -0.6;
const implac = -0.3;
const impos = 0.5;
const impossibl = -0.5;
const impratic = -0.25;
const impression = 0.7;
const improb = -0.1;
const imprec = 0.15;
const imprecis = 0.15;
const imprevisibl = -0.2;
const imprevu = 0.08;
const imprevus = 0.08;
const impuiss = -0.2;
const impenetr = 0.09;
const imper = 0.02;
const imperial = -0.2;
const imperi = -0.1;
const inabord = -0.05;
const inaccessibl = -0.2;
const inadmissibl = 0.3;
const inalter = 0.25;
const inaltere = 0.25;
const inamical = -0.35;
const inapt = -0.33;
const inattendu = 0.2;
const inattendus = 0.2;
const inaudibl = -0.1;
const incalcul = 0.11;
const incap = -0.67;
const incarnat = 0.01;
const incertain = -0.3;
const incess = -0.2;
const incompar = 0.1;
const incomprehensibl = -0.4;
const inconcev = 0.3;
const inconnu = -0.2;
const inconnus = -0.2;
const inconscient = -0.3;
const incroi = 0.6;
const incredul = -0.4;
const indien = 0;
const indifferent = -0.4;
const indigent = -0.5;
const indign = -0.3;
const indiscret = -0.3;
const indispens = 0.8;
const individuel = -0.03;
const indompt = 0.04;
const indompte = 0.04;
const industriel = 0.05;
const indec = -0.2;
const indecis = -0.2;
const indefin = 0;
const independ = 0.1;
const indetermin = -0.15;
const indetermine = -0.15;
const inentam = 0;
const inentame = 0;
const inert = -0.1;
const inesper = 0.4;
const inespere = 0.4;
const inexplor = -0.1;
const inexplore = -0.1;
const infernal = -0.6;
const infim = -0.1;
const infin = 0;
const infinitesimal = -0.11;
const inflexibl = -0.17;
const influent = 0.3;
const inferieur = -0.5;
const ingenu = 0.1;
const ingenus = 0.1;
const inhumain = -0.5;
const inimagin = 0.3;
const injust = -0.4;
const innocent = 0.2;
const innombr = 0.2;
const inopin = 0.02;
const inopine = 0.02;
const inoubli = 0.6;
const inou = 0.9;
const inoui = 0.9;
const inquiet = -0.4;
const inquisiteur = 0.04;
const inquisitric = 0.04;
const insatisf = -0.32;
const insatisfait = -0.32;
const insensibl = -0.3;
const insens = -0.4;
const insense = -0.4;
const insignifi = -0.4;
const insolent = -0.7;
const insolit = -0.3;
const insouten = -0.1;
const inspir = 0.1;
const inspire = 0.1;
const instabl = -0.12;
const instant = 0.1;
const instinct = 0;
const insupport = -0.2;
const intact = 0;
const intangibl = 0.17;
const intellectuel = 0.1;
const intelligent = 0.9;
const intelligibl = 0.14;
const intens = 0.4;
const interd = -0.1;
const interdit = -0.1;
const interess = 0.3;
const intermin = -0.5;
const intermediair = -0.08;
const international = 0.35;
const intern = -0.03;
const interrog = 0.04;
const intestin = -0.02;
const intim = 0.2;
const intoler = -0.5;
const integral = 0.09;
const interieur = -0.07;
const inutil = -0.3;
const invers = 0;
const invincibl = 0.21;
const inviol = 0.17;
const invisibl = -0.07;
const invraisembl = -0.25;
const ined = 0.12;
const inedit = 0.12;
const inepuis = 0.1;
const inequit = -0.2;
const inevit = -0.2;
const irascibl = -0.22;
const iron = 0.3;
const irrattrap = 0;
const irrespons = 0.1;
const irreel = 0.1;
const irresistibl = 0.9;
const isol = -0.2;
const isole = -0.2;
const israelit = 0;
const italien = 0;
const ivre = -0.5;
const jalous = -0.4;
const jaloux = -0.4;
const japon = 0;
const japonais = 0;
const jaun = -0.02;
const jaunatr = 0;
const jeun = 0.32;
const joint = 0;
const jol = 0.57;
const jouiss = -0.28;
const journali = 0;
const journalier = 0;
const joyeux = 0.55;
const judici = 0.1;
const juif = 0;
const juiv = 0;
const jumel = 0;
const jumele = 0;
const just = 0.22;
const laid = -0.7;
const laiteux = 0;
const lambin = -0.21;
const lament = -0.3;
const langour = 0.12;
const lapidair = 0;
const larg = 0.15;
const las = -0.4;
const lascif = 0.12;
const lasciv = 0.12;
const lass = -0.4;
const latin = 0;
const lent = -0.42;
const lev = 0.4;
const leve = 0.4;
const libr = 0.45;
const liberal = -0.05;
const liber = 0.1;
const libere = 0.1;
const licenci = 0.04;
const lilial = 0.03;
const limit = -0.12;
const limite = -0.12;
const limpid = 0;
const liquid = 0;
const liquor = 0.1;
const lisibl = 0.14;
const liss = 0.2;
const litterair = 0.1;
const liturg = 0.17;
const livid = -0.5;
const local = 0;
const logiqu = 0.1;
const lointain = -0.1;
const long = -0.4;
const longu = -0.4;
const louabl = 0.25;
const louch = -0.5;
const lourd = -0.05;
const loyal = 0.1;
const lucid = 0.2;
const lugubr = -0.6;
const luis = 0.4;
const lumin = 0.6;
const luxueux = 0.5;
const lach = -0.1;
const legendair = 0.4;
const leg = 0.18;
const leger = 0.18;
const legitim = 0.2;
const leonin = -0.2;
const maghrebin = 0;
const magiqu = 0.7;
const magnif = 1;
const maigr = -0.2;
const majestu = 1;
const mal = -0.7;
const malad = -0.35;
const maladroit = -0.6;
const malentend = -0.15;
const malfais = -0.15;
const malgr = 0.2;
const malheur = -0.3;
const malici = -0.07;
const malign = -0.3;
const malin = -0.3;
const malleabl = 0.14;
const manifest = 0.05;
const manqu = -0.05;
const marin = 0;
const maritim = 0;
const mar = 0;
const marie = 0;
const marr = 0.4;
const marron = 0;
const martial = -0.07;
const marxist = 0;
const masculin = 0;
const massif = 0;
const massiv = 0;
const mastoc = 0;
const mat = -0.1;
const maternel = 0;
const matinal = 0;
const materiel = 0.29;
const maud = -0.8;
const maudit = -0.8;
const mauv = 0;
const mauvais = -0.71;
const meilleur = 0.53;
const menac = -0.6;
const mensong = -0.25;
const mensonger = -0.25;
const mental = 0.2;
const merc = 0.3;
const merd = -0.7;
const merveil = 0.9;
const mesur = -0.1;
const mesure = -0.1;
const meurtri = -0.6;
const meurtrier = -0.6;
const mignon = 0.3;
const militair = -0.13;
const minabl = -0.2;
const minc = -0.03;
const minim = -0.2;
const minuscul = -0.22;
const miracul = 0.2;
const misogyn = -0.6;
const miser = -1;
const mobil = 0.1;
const moch = -0.8;
const modern = 0.2;
const modest = -0.2;
const model = 0;
const moder = -0.15;
const modere = -0.15;
const moelleux = -0.03;
const moindr = -0.1;
const moit = -0.1;
const molleton = 0;
const molletonne = 0;
const mondain = 0;
const mondial = 0;
const monocord = -0.1;
const monoton = -0.2;
const monstrueux = -0.4;
const monumental = 0.3;
const moqu = -0.2;
const moral = 0;
const morn = -0.6;
const mou = -0.2;
const mouchet = -0.3;
const mouchete = -0.3;
const mouill = 0;
const mouille = 0;
const mous = -0.2;
const mouv = 0.4;
const moyen = -0.15;
const muet = -0.1;
const multicolor = 0;
const multipl = 0.2;
const municipal = 0;
const muscl = 0.21;
const muscle = 0.21;
const musical = 0;
const mystiqu = 0.2;
const mysteri = 0.28;
const mecan = 0;
const mech = -0.4;
const mecontent = -0.4;
const median = -0.08;
const medical = 0;
const mediocr = -0.4;
const mefi = -0.4;
const melancol = -0.3;
const melang = -0.1;
const melange = -0.1;
const menag = 0.05;
const menager = 0.05;
const mepris = -0.6;
const metall = 0;
const metaphys = 0;
const metropolitain = 0.1;
const mem = 0;
const mur = 0.2;
const naiss = 0.14;
const natal = 0.3;
const national = 0;
const natur = 0.25;
const naturel = 0.38;
const nautiqu = 0;
const naz = -0.7;
const naif = 0.1;
const naiv = 0.1;
const nerveux = -0.3;
const net = 0.3;
const neuf = 0.1;
const neutr = 0;
const neuv = 0.1;
const nobl = 0.3;
const nocturn = 0;
const noir = -0.1;
const nombreux = 0;
const non = -0.01;
const nonchal = -0.1;
const nord = 0;
const normal = 0.17;
const nouveau = 0.34;
const nouvel = 0.1;
const nu = 0.16;
const nuageux = -0.2;
const nul = -0.2;
const nus = 0.16;
const necessair = 0.27;
const neglige = -0.25;
const obligatoir = -0.2;
const obliqu = 0;
const obscur = -0.47;
const obscen = -0.9;
const occidental = 0.05;
const occult = 0.04;
const occup = -0.1;
const occupe = -0.1;
const odieux = -0.7;
const oecumen = -0.05;
const officiel = 0;
const oiseux = -0.15;
const ombreux = -0.2;
const opalescent = 0.03;
const opaqu = -0.1;
const oppos = -0.1;
const oppose = -0.1;
const opulent = 0.23;
const oper = 0.2;
const orang = 0;
const ordinair = -0.2;
const organis = 0.4;
const organise = 0.4;
const oriental = 0;
const original = 0.2;
const orthodox = 0;
const orthogonal = 0.03;
const oubl = -0.4;
const oublie = -0.4;
const oui = 0.01;
const ouvert = 0.31;
const oval = 0;
const pacif = 0.4;
const paisibl = 0.8;
const pantouflard = 0.4;
const paradisiaqu = 0;
const parallel = 0.1;
const paralys = -0.08;
const paralyse = -0.08;
const pareil = 0;
const parental = 0.05;
const paress = -0.4;
const parf = 0.8;
const parfait = 0.8;
const parfum = 0.2;
const parfume = 0.2;
const parigot = 0;
const parisien = 0;
const part = -0.1;
const particuli = -0.15;
const particulier = -0.15;
const parvenu = 0.05;
const parvenus = 0.05;
const pascal = 0;
const passion = 0.8;
const passionne = 0.8;
const pass = -0.2;
const passe = -0.2;
const passeist = 0;
const patent = 0.1;
const paternel = -0.2;
const pathet = -1;
const patient = 0;
const pauvr = -0.37;
const peinard = 0.4;
const pench = 0;
const penche = 0;
const pensif = 0.1;
const pensiv = 0.1;
const perceptibl = 0.05;
const perdu = -0.45;
const perdus = -0.45;
const permanent = 0;
const perm = 0.03;
const perpendiculair = 0;
const perplex = -0.1;
const perpetuel = -0.1;
const personnel = 0.05;
const pes = -0.2;
const petiot = 0.05;
const pet = 0.1;
const petit = 0.1;
const peu = -0.05;
const phosphorescent = 0.2;
const physiqu = 0.8;
const pieus = 0.1;
const pieux = 0.1;
const piment = -0.17;
const pimente = -0.17;
const piqu = 0.05;
const pirat = -0.05;
const pir = -0.4;
const piteux = -0.15;
const pitoi = -0.2;
const plais = 0.15;
const plaqu = -0.25;
const plaque = -0.25;
const plastiqu = -0.03;
const plat = -0.28;
const platin = 0.01;
const platine = 0.01;
const plein = 0.29;
const pleur = -0.5;
const plebeien = 0.25;
const plus = 0.15;
const pointu = 0.3;
const pointus = 0.3;
const poisseux = -0.05;
const pol = 0.3;
const polit = 0;
const polon = 0;
const polonais = 0;
const ponder = 0.15;
const pondere = 0.15;
const populaci = -0.02;
const populacier = -0.02;
const populair = 0.5;
const posit = 0;
const possibl = 0;
const possed = 0.23;
const postal = 0;
const posterieur = 0;
const pos = 0.1;
const pose = 0.1;
const poubel = -0.1;
const pourpr = 0;
const pourr = -0.8;
const poussier = -0.2;
const poetiqu = 0.2;
const pratic = 0;
const pratiqu = 0.2;
const premi = 0.5;
const premier = 0.5;
const press = -0.3;
const presse = -0.3;
const primit = -0.1;
const primordial = 0.13;
const principal = 0.1;
const prisonni = -0.3;
const prisonnier = -0.3;
const privileg = 0.2;
const privilegie = 0.2;
const priv = 0;
const prive = 0;
const probabl = 0;
const prob = 0;
const prochain = 0;
const proch = 0.32;
const prodigi = 0.15;
const product = 0.05;
const profan = 0.1;
const professionnel = 0.2;
const profond = 0.2;
const progress = -0.11;
const proletarien = -0.3;
const propic = 0.2;
const propr = 0.33;
const protest = 0;
const provisoir = -0.1;
const prudent = -0.1;
const prussien = 0;
const precair = -0.12;
const precieux = 0.6;
const precipit = 0.17;
const precipite = 0.17;
const prec = 0.4;
const precis = 0.4;
const precoc = 0.1;
const precurseur = 0;
const precedent = 0;
const predomin = 0.3;
const preexist = 0.25;
const prefer = 0.75;
const prefere = 0.75;
const preponder = 0.2;
const present = 0.12;
const preeminent = 0.3;
const pret = 0.14;
const psychiqu = 0.05;
const pu = -0.5;
const publiqu = 0;
const puber = 0.16;
const puiss = 0.6;
const puniss = -0.12;
const pur = 0.5;
const pueril = -0.4;
const pal = -0.05;
const palichon = 0.03;
const pateux = -0.1;
const penibl = -0.4;
const pepit = 0.7;
const peremptoir = -0.14;
const perim = -0.2;
const perime = -0.2;
const periss = -0.12;
const petrif = -0.08;
const petrifie = -0.08;
const quadrangulair = 0;
const qualit = 0.4;
const quatriem = 0;
const quelconqu = -0.15;
const quotidien = 0;
const raccourc = 0;
const radical = -0.1;
const radieux = 0.6;
const raffin = 0.1;
const raffine = 0.1;
const raid = -0.2;
const raison = 0.2;
const ramollo = -0.1;
const ramollos = -0.1;
const rapid = 0.35;
const raplapl = -0.1;
const rar = 0.25;
const rassas = 0.15;
const rassasie = 0.15;
const rassur = 0.2;
const rat = -0.4;
const rate = -0.4;
const rauqu = -0.1;
const rav = 0.9;
const recherch = 0.3;
const recherche = 0.3;
const recommand = 0.2;
const recommande = 0.2;
const reconnu = 0.14;
const reconnus = 0.14;
const rectangulair = 0;
const rectilign = 0.09;
const recul = -0.07;
const recule = -0.07;
const redoubl = 0;
const redouble = 0;
const redout = -0.4;
const refroid = -0.05;
const relat = 0;
const relev = 0;
const releve = 0;
const religi = 0;
const remarqu = 0.4;
const rempl = 0;
const renvers = 0;
const renverse = 0;
const respons = 0.3;
const ressembl = 0.08;
const rich = 0.45;
const richess = 0.4;
const ridicul = -0.75;
const rigid = -0.1;
const rigol = 0.5;
const rigour = 0.1;
const rir = 0.5;
const robust = 0.2;
const rocheux = 0;
const romain = 0;
const romanesqu = 0;
const romant = 0.4;
const rond = -0.3;
const rondelet = -0.15;
const ros = 0.08;
const rosatr = 0.04;
const roturi = -0.3;
const roturier = -0.3;
const roug = 0.01;
const roul = 0;
const rouss = 0;
const roussatr = 0;
const roux = 0;
const royal = 0.2;
const rud = -0.2;
const ruineux = -0.11;
const russ = 0;
const rebarb = -0.6;
const recent = 0.1;
const rechauff = 0.03;
const rechauffe = 0.03;
const reduit = -0.1;
const reel = 0.2;
const reflech = 0.19;
const regal = 0.6;
const reglementair = 0.05;
const reguli = 0.1;
const regulier = 0.1;
const republicain = 0;
const repugn = -0.7;
const repet = 0;
const repete = 0;
const reserv = -0.05;
const reserve = -0.05;
const resist = -0.11;
const resolu = 0.2;
const resolus = 0.2;
const retroact = 0.25;
const reuss = -0.2;
const revolu = -0.16;
const revolus = -0.16;
const revolutionnair = 0.4;
const sacr = 0.35;
const sacre = 0.35;
const sag = 0.2;
const saign = -0.2;
const saill = 0.1;
const sain = 0.3;
const salaud = -0.8;
const sal = -0.1;
const sale = -0.1;
const sangl = -0.4;
const sanguinolent = -0.2;
const saoul = -0.7;
const sarrasin = 0;
const satisfais = 0.4;
const satisf = 0.3;
const satisfait = 0.3;
const saumon = 0.04;
const saumatr = -0.17;
const sauvag = 0.08;
const sav = 0.5;
const scandal = -0.8;
const scolair = 0.1;
const scrupul = 0;
const sculpt = 0.2;
const sculpte = 0.2;
const sec = -0.25;
const second = 0;
const secret = 0.08;
const semblabl = 0;
const sensibl = 0.2;
const sensuel = 0.6;
const sentimental = 0.1;
const serein = 0.1;
const serr = 0;
const serre = 0;
const seul = -0.1;
const sexuel = 0.3;
const si = 0.1;
const silenci = 0.06;
const simpl = 0.1;
const simplist = 0.05;
const sincer = 0.5;
const singuli = -0.2;
const singulier = -0.2;
const sinistr = -0.65;
const sirup = -0.05;
const sixiem = 0;
const social = 0.25;
const societal = 0.12;
const dis = -0.3;
const soigneux = 0.22;
const soign = 0.1;
const soigne = 0.1;
const soldatesqu = -0.07;
const solennel = -0.5;
const solid = 0.5;
const solitair = -0.2;
const sombr = -0.33;
const sommair = 0.05;
const somptueux = 0.6;
const sonor = 0;
const sordid = -0.4;
const soucieux = -0.25;
const soudain = 0.03;
const soup = -0.5;
const soupl = 0.1;
const sourd = -0.3;
const sourdingu = -0.15;
const souri = 0.7;
const sourir = 0.3;
const sournois = -0.6;
const souterrain = 0;
const souverain = 0;
const soviet = -0.45;
const soyeux = 0.1;
const spacieux = 0.19;
const spirituel = 0.1;
const splendid = 0.8;
const spontan = 0.2;
const spontane = 0.2;
const spontaneit = 0.3;
const sportif = 0.1;
const sportiv = 0.1;
const special = 0.5;
const specif = -0.08;
const stabl = -0.01;
const strateg = 0;
const strict = -0.1;
const stupid = -0.5;
const stupef = 0.4;
const stupefait = 0.4;
const steril = -0.2;
const sub = -0.2;
const subit = -0.2;
const subject = -0.1;
const sublim = 1;
const subtil = 0.2;
const success = 0;
const suffis = 0.1;
const suiss = 0;
const suissess = 0;
const suiv = 0;
const suiveur = 0;
const suiveux = 0;
const sup = 0.7;
const superb = 1;
const superflu = -0.15;
const superflus = -0.15;
const supplementair = 0.1;
const supranational = 0.17;
const suprem = 0.6;
const superieur = 0.4;
const surpren = 0.8;
const surpr = 0.55;
const surpris = 0.55;
const susceptibl = -0.1;
const suspect = -0.3;
const suspendu = -0.1;
const suspendus = -0.1;
const symbol = 0;
const symp = 0.2;
const sympath = 0.6;
const sech = -0.25;
const semit = 0;
const separ = -0.08;
const separe = -0.08;
const serieux = 0.45;
const sever = -0.25;
const sur = 0.2;
const taciturn = -0.05;
const taill = 0.1;
const taille = 0.1;
const talent = 0.3;
const taraud = -0.28;
const tardif = -0.1;
const tardiv = -0.1;
const technicien = 0.1;
const tel = 0;
const tenac = -0.1;
const tendr = 0.28;
const tendu = -0.45;
const tendus = -0.45;
const tenu = 0;
const tenus = 0;
const terminal = -0.14;
const tern = -0.5;
const terrestr = 0;
const terribl = -0.7;
const terrifi = -0.7;
const territorial = 0;
const teuton = 0;
const theolog = 0;
const theatral = -0.05;
const timid = -0.1;
const tied = 0.05;
const tomb = -0.15;
const tombe = -0.15;
const tordu = -0.2;
const tordus = -0.2;
const total = 0.1;
const touch = 0.3;
const tous = 0.22;
const tout = 0.22;
const traditionnel = 0;
const tragiqu = -0.4;
const tranquill = 0.15;
const transalpin = 0;
const transcend = 0.09;
const transparent = 0.3;
const trembl = -0.1;
const tremblot = -0.05;
const tremp = 0;
const trempe = 0;
const tre = 0.01;
const tricolor = 0.1;
const triomphal = 0.6;
const triomph = 0.9;
const trist = -0.3;
const troisiem = 0;
const trompeur = -0.3;
const trompeux = -0.3;
const trop = -0.25;
const troubl = -0.1;
const trouble = -0.1;
const tudesqu = 0;
const turc = 0;
const turqu = 0;
const telephon = 0;
const tenebr = -0.16;
const terebr = -0.28;
const ultim = 0.6;
const ultramontain = 0;
const ulterieur = 0;
const uni = 0.1;
const uniqu = 0.43;
const unis = 0.1;
const universel = 0.2;
const urgent = -0.1;
const util = 0.2;
const vacill = -0.05;
const vagu = -0.4;
const vain = -0.3;
const valabl = 0.4;
const valetudinair = -0.18;
const vapor = 0.09;
const vast = 0.38;
const verdatr = 0;
const vert = 0;
const vertical = 0;
const vertigin = -0.1;
const vertueux = 0.05;
const victori = 0.8;
const vid = -0.29;
const vieil = 0.5;
const vierg = 0.1;
const vieux = 0.5;
const vif = 0.27;
const vigil = 0.3;
const vigour = 0.4;
const vilain = -0.6;
const violent = -0.5;
const violet = 0;
const viril = 0.4;
const visibl = 0;
const visqueux = -0.05;
const vital = 0.1;
const vitr = 0;
const vitre = 0;
const vivac = 0.4;
const viv = 0.27;
const voisin = 0.05;
const vol = 0;
const volontair = 0;
const volont = 0.1;
const voluptu = 0.6;
const vom = -0.2;
const vout = 0;
const voute = 0;
const vrai = 0;
const vrais = 0.05;
const vulgair = -0.7;
const vulner = -0.1;
const veloc = 0.17;
const verit = 0.2;
const vetu = 0;
const vetus = 0;
const waouh = 0.3;
const acre = -0.3;
const apre = -0.2;
const eblou = 0.2;
const ebouriff = 0.45;
const ecarlat = 0.01;
const ecart = -0.1;
const ecarte = -0.1;
const eclair = 0.6;
const eclaire = 0.6;
const eclat = 0.4;
const ecoeur = 0.2;
const econom = 0.1;
const ecras = -0.2;
const ecrase = -0.2;
const edifi = 0;
const egal = 0.2;
const egar = -0.2;
const egare = -0.2;
const egoist = -0.7;
const elanc = 0;
const elance = 0;
const elast = 0.05;
const electr = -0.15;
const eloign = -0.05;
const eloigne = -0.05;
const eleg = 0.7;
const elementair = 0.1;
const elephantesqu = 0.05;
const emeraud = 0;
const eminent = 0.07;
const emouss = -0.3;
const emousse = -0.3;
const emouv = 0.4;
const emu = 0.1;
const emus = 0.1;
const emech = -0.25;
const emeche = -0.25;
const enigmat = 0.1;
const enorm = 0.22;
const epais = 0.06;
const epaiss = 0.06;
const epanou = 0.28;
const epanoui = 0.28;
const epar = -0.1;
const epars = -0.1;
const epat = 0.43;
const ephemer = 0;
const epouvant = -0.7;
const eprouv = 0.3;
const eprouve = 0.3;
const epuis = -0.6;
const epuise = -0.6;
const equilibr = 0.15;
const equilibre = 0.15;
const equip = -0.1;
const equit = 0.11;
const equivalent = 0.05;
const equivoqu = -0.12;
const erot = 0.2;
const esoter = 0.18;
const eteint = -0.4;
const etendu = 0.05;
const etendus = 0.05;
const eternel = 0.1;
const ether = 0.09;
const ethere = 0.09;
const etincel = 0.3;
const eton = 0.4;
const etonne = 0.4;
const etrang = -0.5;
const etranger = -0.2;
const etriqu = 0.05;
const etrique = 0.05;
const etroit = -0.25;
const evacu = -0.15;
const evacue = -0.15;
const evanou = -0.03;
const evanoui = -0.03;
const evas = -0.2;
const eventuel = 0;
const evident = 0.1;
const require$$0 = {
  abandon,
  abandonne,
  abasourd,
  abattu,
  abattus,
  aberr,
  abomin,
  abond,
  abord,
  abracadabr,
  abrut,
  absent,
  absolu,
  absolus,
  absorb,
  absorbe,
  abstrait,
  absurd,
  abus,
  acariatr,
  accabl,
  accable,
  accept,
  accessibl,
  accident,
  accidente,
  accol,
  accole,
  accommod,
  accompl,
  accort,
  accueil,
  acerb,
  acharn,
  acharne,
  achev,
  acheve,
  acidul,
  acidule,
  actif,
  activ,
  actuel,
  additionnel,
  adjacent,
  administr,
  admir,
  adolescent,
  ador,
  adroit,
  adul,
  adventic,
  advers,
  adequat,
  affabl,
  affectu,
  affil,
  affile,
  afflig,
  afflige,
  affol,
  affole,
  affreux,
  africain,
  agac,
  agiss,
  agit,
  agite,
  agress,
  agreabl,
  ahur,
  aigr,
  aigu,
  aiguis,
  aiguise,
  aigus,
  aimabl,
  aim,
  aime,
  ajout,
  ajoute,
  ajust,
  ajuste,
  alarm,
  algerien,
  allemand,
  allogen,
  allong,
  allonge,
  allum,
  allume,
  allegr,
  altruist,
  alter,
  altere,
  aleatoir,
  amaigr,
  ambi,
  ambigu,
  ambigus,
  amer,
  ami,
  amical,
  amis,
  amour,
  ample,
  amus,
  amelior,
  ameliore,
  americain,
  amerindien,
  amethyst,
  analog,
  analogu,
  ancestral,
  ancien,
  android,
  anglais,
  angoiss,
  angoisse,
  angel,
  anhydr,
  animal,
  annex,
  annexe,
  anodin,
  anonym,
  anormal,
  antagon,
  anthropoid,
  anticapital,
  antiqu,
  anterieur,
  anxieux,
  apeur,
  apeure,
  aphas,
  aplat,
  apparent,
  appliqu,
  applique,
  approch,
  approche,
  appropr,
  approprie,
  approxim,
  appreci,
  apprec,
  arab,
  arachneen,
  ardent,
  argent,
  argente,
  aristocrat,
  arme,
  arriv,
  arrive,
  arrier,
  arriere,
  arrond,
  arret,
  arrete,
  artificiel,
  artist,
  assembl,
  assidu,
  assidus,
  assis,
  assoup,
  assujet,
  assur,
  assure,
  astral,
  astronom,
  astuci,
  athlet,
  atroc,
  atrocit,
  attach,
  attard,
  attarde,
  atten,
  attent,
  attention,
  attentionne,
  attir,
  attitr,
  attitre,
  attrist,
  attriste,
  atyp,
  aubergin,
  audaci,
  audibl,
  august,
  auster,
  authent,
  autonom,
  autoris,
  autorise,
  autoritair,
  autr,
  avanc,
  avance,
  avantag,
  avar,
  avarie,
  aven,
  aventur,
  aveugl,
  avid,
  azimut,
  aerien,
  ain,
  aine,
  bagarreur,
  bagarr,
  balist,
  balourd,
  banal,
  bancal,
  barbar,
  bas,
  basan,
  basane,
  bass,
  batailleur,
  bataill,
  batt,
  battu,
  battus,
  bavard,
  beau,
  beaucoup,
  bel,
  belg,
  belliger,
  belliqu,
  besogn,
  bien,
  bienfais,
  bienheur,
  biens,
  bienveil,
  bijou,
  biscornu,
  biscornus,
  bistr,
  bizarr,
  blafard,
  blanc,
  blanch,
  bless,
  blesse,
  bleu,
  bleus,
  bleut,
  bleute,
  bleuatr,
  blond,
  blamabl,
  blem,
  bon,
  bonheur,
  bonhomm,
  boudin,
  boudine,
  boueux,
  bouff,
  bouffon,
  bouill,
  bourgeois,
  bourr,
  bourre,
  brav,
  bref,
  breton,
  brill,
  bris,
  brise,
  britann,
  british,
  brun,
  brusqu,
  brutal,
  brui,
  brev,
  brul,
  brule,
  burin,
  burine,
  burlesqu,
  byzantin,
  be,
  bet,
  cabalist,
  cach,
  cache,
  cadeau,
  cagneux,
  calcin,
  calcine,
  calcul,
  calm,
  camard,
  candid,
  capabl,
  capital,
  capiton,
  capitonne,
  captif,
  captiv,
  carmin,
  carr,
  carre,
  cass,
  casse,
  catastroph,
  cathol,
  cavali,
  cavalier,
  cavern,
  cendr,
  cendre,
  cens,
  cense,
  central,
  certain,
  chaleur,
  chang,
  change,
  charit,
  charm,
  charnel,
  charnu,
  charnus,
  chast,
  chatoi,
  chaud,
  chauv,
  cher,
  chic,
  chimer,
  chinois,
  chois,
  chouet,
  chroniqu,
  chretien,
  cherot,
  chetif,
  chetiv,
  cingl,
  cingle,
  cinoqu,
  cinquiem,
  cinet,
  circonspect,
  circulair,
  cireux,
  cisel,
  cisele,
  civil,
  civilis,
  civilise,
  clair,
  clandestin,
  classiqu,
  clos,
  clerical,
  coc,
  coeur,
  coll,
  collect,
  collegial,
  colonial,
  color,
  colore,
  colossal,
  coler,
  combat,
  combatt,
  combl,
  comble,
  comiqu,
  commenc,
  commercial,
  commod,
  commun,
  communautair,
  compact,
  compar,
  complet,
  complex,
  complexe,
  complic,
  compliqu,
  complique,
  composit,
  compress,
  compresse,
  comprim,
  comprime,
  comprehensibl,
  con,
  concentr,
  concentre,
  conc,
  concis,
  conclu,
  concret,
  condescend,
  confessionnel,
  confi,
  confidentiel,
  confin,
  confine,
  confondu,
  confondus,
  conform,
  confort,
  confus,
  conjugal,
  conner,
  connu,
  connus,
  conscienci,
  conscient,
  conseil,
  consider,
  consign,
  consigne,
  consist,
  "const": 0.1,
  constern,
  consterne,
  consequent,
  contemporain,
  content,
  contest,
  continental,
  contingent,
  continu,
  continus,
  contract,
  contracte,
  contradictoir,
  contrair,
  contrari,
  contr,
  contrit,
  convaincu,
  convaincus,
  conven,
  cordial,
  coriac,
  corpulent,
  correct,
  corrig,
  corrige,
  corrompu,
  corrompus,
  cosmiqu,
  cosmopolit,
  costaud,
  coton,
  couch,
  couche,
  coupabl,
  coup,
  coupe,
  courag,
  cour,
  courb,
  court,
  courtois,
  coutumi,
  coutumier,
  couteux,
  craintif,
  craintiv,
  cramois,
  crasseux,
  crayeux,
  creus,
  creux,
  cri,
  criminel,
  cristallin,
  critiqu,
  crois,
  croise,
  croul,
  croustill,
  cru,
  crucial,
  cruel,
  crus,
  credul,
  cretin,
  cuis,
  cuit,
  culturel,
  cuprifer,
  cupriqu,
  curieux,
  cyclopeen,
  celest,
  celebr,
  ceruleen,
  cerebral,
  emot,
  danger,
  dantesqu,
  dem,
  dens,
  derni,
  dernier,
  deuxiem,
  difficil,
  difform,
  different,
  dign,
  dingu,
  diplomat,
  direct,
  dirig,
  discord,
  discret,
  discut,
  disgraci,
  disparat,
  disparu,
  disparus,
  dispendi,
  disponibl,
  dissembl,
  dissimul,
  dissimule,
  dist,
  distinct,
  distingu,
  distingue,
  distr,
  distrait,
  diurn,
  diver,
  divers,
  divin,
  docil,
  domest,
  domin,
  dommag,
  don,
  donne,
  dorm,
  dormeur,
  dormeux,
  dor,
  dore,
  doubl,
  douc,
  doucer,
  doulour,
  douteux,
  doux,
  draconien,
  dramat,
  dress,
  dresse,
  droit,
  dru,
  drus,
  drol,
  dur,
  duvet,
  dynam,
  debil,
  debonnair,
  debut,
  decent,
  decept,
  decharn,
  decharne,
  dechir,
  dechire,
  decid,
  decide,
  decis,
  deconcert,
  deconcerte,
  deconf,
  deconfit,
  decoupl,
  decouple,
  decouvert,
  decouvr,
  def,
  defait,
  defavor,
  defendu,
  defendus,
  deficient,
  definit,
  deform,
  deforme,
  degout,
  degueul,
  delaiss,
  delaisse,
  delect,
  delicat,
  delici,
  delictu,
  dement,
  demerdard,
  demesur,
  demesure,
  demod,
  demode,
  denud,
  denude,
  depeupl,
  depeuple,
  deplais,
  deplor,
  deraison,
  derisoir,
  derout,
  deregl,
  deregle,
  desagre,
  desarm,
  desarme,
  desastr,
  desax,
  desaxe,
  desert,
  deserte,
  desesper,
  desespere,
  deshabill,
  deshabille,
  deshydrat,
  deshydrate,
  desherit,
  desherite,
  desol,
  desole,
  detach,
  detache,
  detaill,
  detaille,
  detenu,
  detenus,
  detest,
  devor,
  decu,
  decus,
  ecclesiast,
  effect,
  efficac,
  efficient,
  effil,
  effile,
  efflanqu,
  efflanque,
  effrai,
  effray,
  effraye,
  effroi,
  effemin,
  effemine,
  ellipt,
  embarrass,
  embarr,
  embarrasse,
  emberlificot,
  embras,
  embrase,
  embrouill,
  embrouille,
  embrum,
  embrume,
  emmerd,
  emprison,
  emprisonne,
  empat,
  empate,
  encaiss,
  encaisse,
  encastr,
  encastre,
  enceint,
  enchant,
  enchante,
  encrout,
  endeuill,
  endeuille,
  endommag,
  endommage,
  endorm,
  enfantin,
  enflamm,
  enflamme,
  engourd,
  enjou,
  enjoue,
  ennem,
  ennui,
  ennuy,
  ennuye,
  ensangl,
  ensanglante,
  ensorcel,
  entaill,
  entaille,
  entendu,
  entendus,
  enthousiast,
  entich,
  entiche,
  enti,
  entier,
  entortill,
  entortille,
  entrouvert,
  envah,
  envelopp,
  enveloppe,
  envieux,
  envout,
  errant,
  espagnol,
  espiegl,
  essai,
  essentiel,
  esseul,
  esseule,
  estim,
  europeen,
  exact,
  excellent,
  exceptionnel,
  excess,
  excit,
  excite,
  exclus,
  exemplair,
  exig,
  exist,
  exorbit,
  exot,
  explicit,
  express,
  expre,
  exquis,
  extern,
  extraordinair,
  extravag,
  extrem,
  exterieur,
  execr,
  fabul,
  facil,
  factic,
  fad,
  faibl,
  faisabl,
  fameux,
  familial,
  famili,
  familier,
  fantast,
  farouch,
  fatal,
  fatig,
  fatigu,
  fatigue,
  fauch,
  fauche,
  fauss,
  fauv,
  faux,
  favor,
  favorit,
  femel,
  ferm,
  ferme,
  fertil,
  fessi,
  fessier,
  fichu,
  fichus,
  fidel,
  fi,
  fier,
  fig,
  fige,
  fin,
  final,
  fix,
  fievreux,
  flagad,
  flageol,
  flagr,
  flamboi,
  flegmat,
  fleur,
  flexibl,
  flott,
  flou,
  flous,
  fluid,
  flaneur,
  flaneux,
  foll,
  fonc,
  fonce,
  forcen,
  forcene,
  forc,
  force,
  formel,
  formid,
  fort,
  fortuit,
  fortun,
  fortune,
  fossil,
  fou,
  foudroi,
  fouineur,
  fouin,
  fourr,
  fourre,
  fourvoy,
  fourvoye,
  fous,
  foutais,
  foutu,
  foutus,
  fragil,
  frais,
  franc,
  franch,
  franchouillard,
  francais,
  fraternel,
  fraich,
  frisquet,
  frisson,
  fris,
  frise,
  froid,
  froiss,
  froisse,
  fructueux,
  frust,
  frem,
  frequent,
  fretill,
  frel,
  fugit,
  fum,
  fume,
  funest,
  funebr,
  fureteur,
  furet,
  furibond,
  furieux,
  furtif,
  furtiv,
  futur,
  febril,
  federal,
  feminin,
  feroc,
  gai,
  gais,
  galop,
  gauch,
  gaulois,
  gentil,
  gentill,
  gigantesqu,
  girond,
  glabr,
  glacial,
  glac,
  glace,
  glauqu,
  global,
  glorieux,
  glu,
  gnangnan,
  godich,
  gonfl,
  gonfle,
  gourmand,
  gracieux,
  grand,
  grandios,
  gras,
  grass,
  gratin,
  gratuit,
  grav,
  gravel,
  grec,
  grecqu,
  grelott,
  gris,
  grisatr,
  grivois,
  gros,
  gross,
  grossi,
  grossier,
  grotesqu,
  guerri,
  guerrier,
  ge,
  genial,
  general,
  gener,
  gen,
  gene,
  habil,
  habill,
  habille,
  habituel,
  hagard,
  haineux,
  halet,
  hard,
  hargneux,
  hasard,
  hasarde,
  haut,
  hautain,
  hellen,
  hermet,
  heureux,
  hexagonal,
  hideux,
  hispan,
  histor,
  hierat,
  homogen,
  homologu,
  honnet,
  honor,
  honteux,
  horizontal,
  horreur,
  horribl,
  hostil,
  humain,
  humanoid,
  humbl,
  humid,
  hyperact,
  hypothet,
  hebreu,
  hebreux,
  hel,
  heroiqu,
  hesit,
  heteroclit,
  heterogen,
  iber,
  ident,
  idiot,
  ideal,
  ideau,
  ignobl,
  ignor,
  ignore,
  illicit,
  illimit,
  illimite,
  illog,
  illustr,
  illegal,
  imaginair,
  imbib,
  imbibe,
  imbecil,
  immacul,
  immacule,
  immanqu,
  immens,
  immigr,
  immobil,
  immuabl,
  immediat,
  immemorial,
  impar,
  imparf,
  imparfait,
  impassibl,
  impatient,
  impavid,
  impecc,
  impens,
  imperceptibl,
  impitoi,
  implac,
  "import": 0.4,
  impos,
  impossibl,
  impratic,
  impression,
  improb,
  imprec,
  imprecis,
  imprevisibl,
  imprevu,
  imprevus,
  impuiss,
  impenetr,
  imper,
  imperial,
  imperi,
  inabord,
  inaccessibl,
  inadmissibl,
  inalter,
  inaltere,
  inamical,
  inapt,
  inattendu,
  inattendus,
  inaudibl,
  incalcul,
  incap,
  incarnat,
  incertain,
  incess,
  incompar,
  incomprehensibl,
  inconcev,
  inconnu,
  inconnus,
  inconscient,
  incroi,
  incredul,
  indien,
  indifferent,
  indigent,
  indign,
  indiscret,
  indispens,
  individuel,
  indompt,
  indompte,
  industriel,
  indec,
  indecis,
  indefin,
  independ,
  indetermin,
  indetermine,
  inentam,
  inentame,
  inert,
  inesper,
  inespere,
  inexplor,
  inexplore,
  infernal,
  infim,
  infin,
  infinitesimal,
  inflexibl,
  influent,
  inferieur,
  ingenu,
  ingenus,
  inhumain,
  inimagin,
  injust,
  innocent,
  innombr,
  inopin,
  inopine,
  inoubli,
  inou,
  inoui,
  inquiet,
  inquisiteur,
  inquisitric,
  insatisf,
  insatisfait,
  insensibl,
  insens,
  insense,
  insignifi,
  insolent,
  insolit,
  insouten,
  inspir,
  inspire,
  instabl,
  instant,
  instinct,
  insupport,
  intact,
  intangibl,
  intellectuel,
  intelligent,
  intelligibl,
  intens,
  interd,
  interdit,
  interess,
  intermin,
  intermediair,
  international,
  intern,
  interrog,
  intestin,
  intim,
  intoler,
  integral,
  interieur,
  inutil,
  invers,
  invincibl,
  inviol,
  invisibl,
  invraisembl,
  ined,
  inedit,
  inepuis,
  inequit,
  inevit,
  irascibl,
  iron,
  irrattrap,
  irrespons,
  irreel,
  irresistibl,
  isol,
  isole,
  israelit,
  italien,
  ivre,
  jalous,
  jaloux,
  japon,
  japonais,
  jaun,
  jaunatr,
  jeun,
  joint,
  jol,
  jouiss,
  journali,
  journalier,
  joyeux,
  judici,
  juif,
  juiv,
  jumel,
  jumele,
  just,
  laid,
  laiteux,
  lambin,
  lament,
  langour,
  lapidair,
  larg,
  las,
  lascif,
  lasciv,
  lass,
  latin,
  lent,
  lev,
  leve,
  libr,
  liberal,
  liber,
  libere,
  licenci,
  lilial,
  limit,
  limite,
  limpid,
  liquid,
  liquor,
  lisibl,
  liss,
  litterair,
  liturg,
  livid,
  local,
  logiqu,
  lointain,
  long,
  longu,
  louabl,
  louch,
  lourd,
  loyal,
  lucid,
  lugubr,
  luis,
  lumin,
  luxueux,
  lach,
  legendair,
  leg,
  leger,
  legitim,
  leonin,
  maghrebin,
  magiqu,
  magnif,
  maigr,
  majestu,
  mal,
  malad,
  maladroit,
  malentend,
  malfais,
  malgr,
  malheur,
  malici,
  malign,
  malin,
  malleabl,
  manifest,
  manqu,
  marin,
  maritim,
  mar,
  marie,
  marr,
  marron,
  martial,
  marxist,
  masculin,
  massif,
  massiv,
  mastoc,
  mat,
  maternel,
  matinal,
  materiel,
  maud,
  maudit,
  mauv,
  mauvais,
  meilleur,
  menac,
  mensong,
  mensonger,
  mental,
  merc,
  merd,
  merveil,
  mesur,
  mesure,
  meurtri,
  meurtrier,
  mignon,
  militair,
  minabl,
  minc,
  minim,
  minuscul,
  miracul,
  misogyn,
  miser,
  mobil,
  moch,
  modern,
  modest,
  model,
  moder,
  modere,
  moelleux,
  moindr,
  moit,
  molleton,
  molletonne,
  mondain,
  mondial,
  monocord,
  monoton,
  monstrueux,
  monumental,
  moqu,
  moral,
  morn,
  mou,
  mouchet,
  mouchete,
  mouill,
  mouille,
  mous,
  mouv,
  moyen,
  muet,
  multicolor,
  multipl,
  municipal,
  muscl,
  muscle,
  musical,
  mystiqu,
  mysteri,
  mecan,
  mech,
  mecontent,
  median,
  medical,
  mediocr,
  mefi,
  melancol,
  melang,
  melange,
  menag,
  menager,
  mepris,
  metall,
  metaphys,
  metropolitain,
  mem,
  mur,
  naiss,
  natal,
  national,
  natur,
  naturel,
  nautiqu,
  naz,
  naif,
  naiv,
  nerveux,
  net,
  neuf,
  neutr,
  neuv,
  nobl,
  nocturn,
  noir,
  nombreux,
  non,
  nonchal,
  nord,
  normal,
  nouveau,
  nouvel,
  nu,
  nuageux,
  nul,
  "null": -0.2,
  nus,
  necessair,
  neglige,
  obligatoir,
  obliqu,
  obscur,
  obscen,
  occidental,
  occult,
  occup,
  occupe,
  odieux,
  oecumen,
  officiel,
  oiseux,
  ombreux,
  opalescent,
  opaqu,
  oppos,
  oppose,
  opulent,
  oper,
  orang,
  ordinair,
  organis,
  organise,
  oriental,
  original,
  orthodox,
  orthogonal,
  oubl,
  oublie,
  oui,
  ouvert,
  oval,
  pacif,
  paisibl,
  pantouflard,
  paradisiaqu,
  parallel,
  paralys,
  paralyse,
  pareil,
  parental,
  paress,
  parf,
  parfait,
  parfum,
  parfume,
  parigot,
  parisien,
  part,
  particuli,
  particulier,
  parvenu,
  parvenus,
  pascal,
  passion,
  passionne,
  pass,
  passe,
  passeist,
  patent,
  paternel,
  pathet,
  patient,
  pauvr,
  peinard,
  pench,
  penche,
  pensif,
  pensiv,
  perceptibl,
  perdu,
  perdus,
  permanent,
  perm,
  perpendiculair,
  perplex,
  perpetuel,
  personnel,
  pes,
  petiot,
  pet,
  petit,
  peu,
  phosphorescent,
  physiqu,
  pieus,
  pieux,
  piment,
  pimente,
  piqu,
  pirat,
  pir,
  piteux,
  pitoi,
  plais,
  plaqu,
  plaque,
  plastiqu,
  plat,
  platin,
  platine,
  plein,
  pleur,
  plebeien,
  plus,
  pointu,
  pointus,
  poisseux,
  pol,
  polit,
  polon,
  polonais,
  ponder,
  pondere,
  populaci,
  populacier,
  populair,
  posit,
  possibl,
  possed,
  postal,
  posterieur,
  pos,
  pose,
  poubel,
  pourpr,
  pourr,
  poussier,
  poetiqu,
  pratic,
  pratiqu,
  premi,
  premier,
  press,
  presse,
  primit,
  primordial,
  principal,
  prisonni,
  prisonnier,
  privileg,
  privilegie,
  priv,
  prive,
  probabl,
  prob,
  prochain,
  proch,
  prodigi,
  product,
  profan,
  professionnel,
  profond,
  progress,
  proletarien,
  propic,
  propr,
  protest,
  provisoir,
  prudent,
  prussien,
  precair,
  precieux,
  precipit,
  precipite,
  prec,
  precis,
  precoc,
  precurseur,
  precedent,
  predomin,
  preexist,
  prefer,
  prefere,
  preponder,
  present,
  preeminent,
  pret,
  psychiqu,
  pu,
  "public": 0,
  publiqu,
  puber,
  puiss,
  puniss,
  pur,
  pueril,
  pal,
  palichon,
  pateux,
  penibl,
  pepit,
  peremptoir,
  perim,
  perime,
  periss,
  petrif,
  petrifie,
  quadrangulair,
  qualit,
  quatriem,
  quelconqu,
  quotidien,
  raccourc,
  radical,
  radieux,
  raffin,
  raffine,
  raid,
  raison,
  ramollo,
  ramollos,
  rapid,
  raplapl,
  rar,
  rassas,
  rassasie,
  rassur,
  rat,
  rate,
  rauqu,
  rav,
  recherch,
  recherche,
  recommand,
  recommande,
  reconnu,
  reconnus,
  rectangulair,
  rectilign,
  recul,
  recule,
  redoubl,
  redouble,
  redout,
  refroid,
  relat,
  relev,
  releve,
  religi,
  remarqu,
  rempl,
  renvers,
  renverse,
  respons,
  ressembl,
  rich,
  richess,
  ridicul,
  rigid,
  rigol,
  rigour,
  rir,
  robust,
  rocheux,
  romain,
  romanesqu,
  romant,
  rond,
  rondelet,
  ros,
  rosatr,
  roturi,
  roturier,
  roug,
  roul,
  rouss,
  roussatr,
  roux,
  royal,
  rud,
  ruineux,
  russ,
  rebarb,
  recent,
  rechauff,
  rechauffe,
  reduit,
  reel,
  reflech,
  regal,
  reglementair,
  reguli,
  regulier,
  republicain,
  repugn,
  repet,
  repete,
  reserv,
  reserve,
  resist,
  resolu,
  resolus,
  retroact,
  reuss,
  revolu,
  revolus,
  revolutionnair,
  sacr,
  sacre,
  sag,
  saign,
  saill,
  sain,
  salaud,
  sal,
  sale,
  sangl,
  sanguinolent,
  saoul,
  sarrasin,
  satisfais,
  satisf,
  satisfait,
  saumon,
  saumatr,
  sauvag,
  sav,
  scandal,
  scolair,
  scrupul,
  sculpt,
  sculpte,
  sec,
  second,
  secret,
  semblabl,
  sensibl,
  sensuel,
  sentimental,
  serein,
  serr,
  serre,
  seul,
  sexuel,
  si,
  silenci,
  simpl,
  simplist,
  sincer,
  singuli,
  singulier,
  sinistr,
  sirup,
  sixiem,
  social,
  societal,
  dis,
  soigneux,
  soign,
  soigne,
  soldatesqu,
  solennel,
  solid,
  solitair,
  sombr,
  sommair,
  somptueux,
  sonor,
  sordid,
  soucieux,
  soudain,
  soup,
  soupl,
  sourd,
  sourdingu,
  souri,
  sourir,
  sournois,
  souterrain,
  souverain,
  soviet,
  soyeux,
  spacieux,
  spirituel,
  splendid,
  spontan,
  spontane,
  spontaneit,
  sportif,
  sportiv,
  special,
  specif,
  stabl,
  strateg,
  strict,
  stupid,
  stupef,
  stupefait,
  steril,
  sub,
  subit,
  subject,
  sublim,
  subtil,
  success,
  suffis,
  suiss,
  suissess,
  suiv,
  suiveur,
  suiveux,
  sup,
  superb,
  superflu,
  superflus,
  supplementair,
  supranational,
  suprem,
  superieur,
  surpren,
  surpr,
  surpris,
  susceptibl,
  suspect,
  suspendu,
  suspendus,
  symbol,
  symp,
  sympath,
  sech,
  semit,
  separ,
  separe,
  serieux,
  sever,
  sur,
  taciturn,
  taill,
  taille,
  talent,
  taraud,
  tardif,
  tardiv,
  technicien,
  tel,
  tenac,
  tendr,
  tendu,
  tendus,
  tenu,
  tenus,
  terminal,
  tern,
  terrestr,
  terribl,
  terrifi,
  territorial,
  teuton,
  theolog,
  theatral,
  timid,
  tied,
  tomb,
  tombe,
  tordu,
  tordus,
  total,
  touch,
  tous,
  tout,
  traditionnel,
  tragiqu,
  tranquill,
  transalpin,
  transcend,
  transparent,
  trembl,
  tremblot,
  tremp,
  trempe,
  tre,
  tricolor,
  triomphal,
  triomph,
  trist,
  troisiem,
  trompeur,
  trompeux,
  trop,
  troubl,
  trouble,
  tudesqu,
  turc,
  turqu,
  telephon,
  tenebr,
  terebr,
  ultim,
  ultramontain,
  ulterieur,
  uni,
  uniqu,
  unis,
  universel,
  urgent,
  util,
  vacill,
  vagu,
  vain,
  valabl,
  valetudinair,
  vapor,
  vast,
  verdatr,
  vert,
  vertical,
  vertigin,
  vertueux,
  victori,
  vid,
  vieil,
  vierg,
  vieux,
  vif,
  vigil,
  vigour,
  vilain,
  violent,
  violet,
  viril,
  visibl,
  visqueux,
  vital,
  vitr,
  vitre,
  vivac,
  viv,
  voisin,
  vol,
  volontair,
  volont,
  voluptu,
  vom,
  vout,
  voute,
  vrai,
  vrais,
  vulgair,
  vulner,
  veloc,
  verit,
  vetu,
  vetus,
  waouh,
  acre,
  apre,
  eblou,
  ebouriff,
  ecarlat,
  ecart,
  ecarte,
  eclair,
  eclaire,
  eclat,
  ecoeur,
  econom,
  ecras,
  ecrase,
  edifi,
  egal,
  egar,
  egare,
  egoist,
  elanc,
  elance,
  elast,
  electr,
  eloign,
  eloigne,
  eleg,
  elementair,
  elephantesqu,
  emeraud,
  eminent,
  emouss,
  emousse,
  emouv,
  emu,
  emus,
  emech,
  emeche,
  enigmat,
  enorm,
  epais,
  epaiss,
  epanou,
  epanoui,
  epar,
  epars,
  epat,
  ephemer,
  epouvant,
  eprouv,
  eprouve,
  epuis,
  epuise,
  equilibr,
  equilibre,
  equip,
  equit,
  equivalent,
  equivoqu,
  erot,
  esoter,
  eteint,
  etendu,
  etendus,
  eternel,
  ether,
  ethere,
  etincel,
  eton,
  etonne,
  etrang,
  etranger,
  etriqu,
  etrique,
  etroit,
  evacu,
  evacue,
  evanou,
  evanoui,
  evas,
  eventuel,
  evident
};
const words = [];
const require$$1 = {
  words
};
var sentiment_fr;
var hasRequiredSentiment_fr;
function requireSentiment_fr() {
  if (hasRequiredSentiment_fr) return sentiment_fr;
  hasRequiredSentiment_fr = 1;
  const pattern = require$$0;
  const negations = require$$1;
  sentiment_fr = {
    afinn: void 0,
    pattern,
    senticon: void 0,
    negations,
    stemmed: true
  };
  return sentiment_fr;
}
var trigrams;
var hasRequiredTrigrams;
function requireTrigrams() {
  if (hasRequiredTrigrams) return trigrams;
  hasRequiredTrigrams = 1;
  function registerTrigrams(container) {
    const language = container.get("Language");
    if (language) {
      language.addModel(
        "Latin",
        "fra",
        " dees de ionnt et tio etent lala e don ne oite lle  les de pt datiroi drdroit  à  coté ns te e smenre  tocon l’touque qules sodesson peons uns ls e prue  pae ct lts onn aue aemee e liontantoututet àresers sace  a trepera dctier libité enux  reen rsoà l ou inlleun natou nnen dune d’ separnteus ur s sansdana pr lproitsés t piree ts psa  déondé da lnceertauxommnalme  na foiqu certéectalebert as a dammeibesane r pocomal s cquiourt e nee nousr daliter difone oau  chairui ell eslits nissératessocautociêtrienintdu estététrapou plratar ranrais oonaainclaégaancrs eurprin ce ms tà u dourebreut  êtage étnsisureinsenserndiensessntrir  macian pst a c dul e sublige rés rée qassndapeuée l’a tea statil tésaisu dineindé equ’ acs in tt cn al’ht qsoit scunrit égoir’enntahom onn e moie ignrelnnat il n trillples él’ereca rotesseuniidéives ut êinsact fan s vigal asligssapréleue flicdisver nutenssirottecs mabl"
      );
    }
  }
  trigrams = registerTrigrams;
  return trigrams;
}
var langFr;
var hasRequiredLangFr;
function requireLangFr() {
  if (hasRequiredLangFr) return langFr;
  hasRequiredLangFr = 1;
  const TokenizerFr = requireTokenizerFr();
  const StemmerFr = requireStemmerFr();
  const StopwordsFr = requireStopwordsFr();
  const NormalizerFr = requireNormalizerFr();
  const SentimentFr = requireSentiment_fr();
  const registerTrigrams = requireTrigrams();
  class LangFr {
    register(container) {
      container.use(TokenizerFr);
      container.use(StemmerFr);
      container.use(StopwordsFr);
      container.use(NormalizerFr);
      container.register("sentiment-fr", SentimentFr);
      registerTrigrams(container);
    }
  }
  langFr = LangFr;
  return langFr;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  const LangFr = requireLangFr();
  const TokenizerFr = requireTokenizerFr();
  const StemmerFr = requireStemmerFr();
  const StopwordsFr = requireStopwordsFr();
  const NormalizerFr = requireNormalizerFr();
  const SentimentFr = requireSentiment_fr();
  src = {
    LangFr,
    StemmerFr,
    StopwordsFr,
    TokenizerFr,
    NormalizerFr,
    SentimentFr
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
