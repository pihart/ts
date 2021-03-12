import {
  AlphaChar,
  AlphaNumChar,
  Digit,
  IsAlpha,
  IsAlphaNum,
  IsDirectInt,
  IsIntDecimal,
  IsNonEmptyAlpha,
  IsNonEmptyAlphaNum,
  IsUnsignedIntDecimal,
  NumChar,
} from "../src";

type Alpha =
  | "ugDYYLugDYYL"
  | "vaYJeNCvaYJeNC"
  | "GChYWAGChYWA"
  | "INLWXMBZmINLWXMBZm"
  | "bwDTeFDbwDTeFD"
  | "nuTKNetmnuTKNetm"
  | "VoqqamVoqqam"
  | "dlfpPMdlfpPM"
  | "lblb"
  | "HpRfxiAHpRfxiA"
  | "REETGSJREETGSJ"
  | "UOybUOyb"
  | "LKHSRPbLKHSRPb"
  | "CEPhMoFRCEPhMoFR"
  | "unIOJgEunIOJgE"
  | "KlTYUKlTYU"
  | "ZeHbBZeHbB"
  | "bfuQuqDbfuQuqD"
  | "OekHlqeMOekHlqeM"
  | "HdxscxQHdxscxQ"
  | "ziNgoKziNgoK"
  | "AWkFsUHAWkFsUH"
  | "DbgmhKTaDbgmhKTa"
  | "FDAQFDAQ"
  | "XtwoqqbXtwoqqb";

// Separating for performance reasons
type Numeric_A =
  | "4684997506366557"
  | "2568220624411657"
  | "7222784845895276"
  | "17642740112712763"
  | "3305751443937859"
  | "09379058174030264"
  | "2591822666586061"
  | "6064473231238279"
  | "570870936191866"
  | "4914395069440749"
  | "18498635989946743"
  | "44251355071208676"
  | "9344831398343372"
  | "8779398646100236"
  | "1886873771717621"
  | "3637096285947936"
  | "435720929367178"
  | "1740374875815094"
  | "08491491453603417";
type Numeric_B =
  | "91773237"
  | "74466445"
  | "94818894"
  | "0304052363"
  | "65657786"
  | "194427527";
type Numeric = Numeric_A | Numeric_B;

type ExpInt = `${Numeric_A}${"e" | "E"}${"+" | "-"}${Numeric_B}`;
type UInt = Numeric | ExpInt;
type SignedInt = `${"+" | "-"}${UInt}`;
type Int = UInt | SignedInt;

type Alphanumeric =
  | "ZC6eb5pd2S"
  | "vnNufQP6zD"
  | "COFRWhBxUgf"
  | "2SjplvIjeGy"
  | "Y933ojY5qZq"
  | "WGcN3N5ClEq"
  | "zLc59as0ArL"
  | "I45RI75QpG"
  | "97z1MuuoFk6"
  | "KpysNlImC5"
  | "Q02BkT3Tkw"
  | "7b25f59s1zt"
  | "O76qqrP1gG"
  | "HQ6W1chAN6Q"
  | "orH4Ipznq9"
  | "6B6KJtEKML6"
  | "0C7w2w770SWI"
  | "4Z022IPYx3X"
  | "63Kl0m9T7L6"
  | "p1tTp6HJ909"
  | "024i312ec96B"
  | "ePTokwaquUW"
  | "TgSe3YJ574"
  | "5juKt9EMhOo";

/**
 * @Test Empty string not assignable to character
 */
{
  // @ts-expect-error TS2322
  const e: AlphaChar | NumChar | AlphaNumChar | Digit = "";
}

/**
 * @Test Empty string is not NonEmptyAlpha, NonEmptyAlphaNum, DirectInt, UnsignedInt, Int
 */
{
  // Could be true, false, boolean, never
  type ExpectFalse =
    | IsNonEmptyAlpha<"">
    | IsNonEmptyAlphaNum<"">
    | IsDirectInt<"">
    | IsUnsignedIntDecimal<"">
    | IsIntDecimal<"">;

  // Make sure not true nor boolean
  // @ts-expect-error TS2322
  const a: ExpectFalse = true;

  // Make sure not true nor never
  const b: ExpectFalse = false;
}

/**
 * @Test Empty string is Alpha, AlphaNum
 */
{
  // Could be true, false, boolean, never
  type ExpectTrue = IsAlpha<""> | IsAlphaNum<"">;

  // Make sure not false nor boolean
  // @ts-expect-error TS2322
  const a: ExpectTrue = false;

  // Make sure not false nor never
  const b: ExpectTrue = true;
}

/**
 * @Test AlphaChar, NumChar, AlphaNumChar, Digit, Alpha, Numeric, Alphanumeric are AlphaNum
 */
{
  // Could be true, false, boolean, never
  type ExpectTrue = IsAlphaNum<
    AlphaChar | NumChar | AlphaNumChar | Digit | Alpha | Numeric | Alphanumeric
  >;

  // Make sure not false nor boolean
  // @ts-expect-error TS2322
  const a: ExpectTrue = false;

  // Make sure not false nor never
  const b: ExpectTrue = true;
}

/**
 * @Test ExpInt, SignedInt are not Alpha, DirectInt, AlphaNum
 */
{
  type considered = ExpInt | SignedInt;
  // Could be true, false, boolean, never
  type ExpectFalse =
    | IsAlpha<considered>
    | IsDirectInt<considered>
    | IsAlphaNum<considered>;

  // Make sure not true nor boolean
  // @ts-expect-error TS2322
  const a: ExpectFalse = true;

  // Make sure not true nor never
  const b: ExpectFalse = false;
}

/**
 * @Test UInt is IsUnsignedIntDecimal
 */
{
  // Could be true, false, boolean, never
  type ExpectTrue = IsUnsignedIntDecimal<UInt>;

  // Make sure not false nor boolean
  // @ts-expect-error TS2322
  const a: ExpectTrue = false;

  // Make sure not false nor never
  const b: ExpectTrue = true;
}

/**
 * @Test Int is IntDecimal
 */
{
  // Could be true, false, boolean, never
  type ExpectTrue = IsIntDecimal<Int>;

  // Make sure not false nor boolean
  // @ts-expect-error TS2322
  const a: ExpectTrue = false;

  // Make sure not false nor never
  const b: ExpectTrue = true;
}

/**
 * @Test Alpha, Alphanumeric are not IntDecimal
 */
{
  // Could be true, false, boolean, never
  type ExpectFalse = IsIntDecimal<Alpha | Alphanumeric>;

  // Make sure not true nor boolean
  // @ts-expect-error TS2322
  const a: ExpectFalse = true;

  // Make sure not true nor never
  const b: ExpectFalse = false;
}
