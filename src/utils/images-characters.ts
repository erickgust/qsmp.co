import { StaticImport } from "next/dist/shared/lib/get-img-props";

// PT-BR
import FelpsBannerCard from "../../public/members/Felps Card Banner.png";
import ForeverBannerCard from "../../public/members/Forever Card Banner.png";
import MikeBannerCard from "../../public/members/Mike Card Banner.png";
import PacBannerCard from "../../public/members/Pac Card Banner.png";
import CellbitBannerCard from "../../public/members/Cellbit Card Banner.png";
import BagiBannerCard from "../../public/members/Bagi Card Banner.png";

// DE
import NihachuBannerCard from "../../public/members/Nihachu Card Banner.png";

// ES
import CarreBannerCard from "../../public/members/Carre Card Banner.png";
import GermanBannerCard from "../../public/members/German Card Banner.png";
import PolispolBannerCard from "../../public/members/Polispol Card Banner.png";
import RiversBannerCard from "../../public/members/Rivers Card Banner.png";
import WillyrexBannerCard from "../../public/members/Willyrex Card Banner.png";
import SpreenDMCBannerCard from "../../public/members/Spreen Card Banner.png";

import RubiusBannerCard from "../../public/members/Rubius Card Banner.png";
import IronmouseBannerCard from "../../public/members/Ironmouse Card Banner.png";
import MaximusBannerCard from "../../public/members/Maximus Card Banner.png";
import LuzuBannerCard from "../../public/members/Luzu Card Banner.png";
import QuackityBannerCard from "../../public/members/Quackity Card Banner.png";
import ElMarianaBannerCard from "../../public/members/ElMariana Card Banner.png";
import RoierBannerCard from "../../public/members/Roier Card Banner.png";

// FR
import KametoBannerCard from "../../public/members/Kameto Card Banner.png";
import AntoineDanielBannerCard from "../../public/members/Antoine Card Banner.png";
import BagheraJonesBannerCard from "../../public/members/Baghera Card Banner.png";
import EtoilesBannerCard from "../../public/members/Etoiles Card Banner.png";
import AypierreBannerCard from "../../public/members/Aypierre Card Banner.png";

// EN
import PhilzaBannerCard from "../../public/members/Philza Card Banner.png";
import BadBoyHaloBannerCard from "../../public/members/BadBoyHalo Card Banner.png";
import FoolishBannerCard from "../../public/members/Foolish Card Banner.png";
import JaidenBannerCard from "../../public/members/Jaiden Card Banner.png";
import SlimecicleBannerCard from "../../public/members/Slimecicle Card Banner.png";

import LenayBannerCard from "../../public/members/Lenay Card Banner.png";
import TinaKittenBannerCard from "../../public/members/TinaKitten Card Banner.png";
import TubboBannerCard from "../../public/members/Tubbo Card Banner.png";
import DanTDMBannerCard from "../../public/members/DanTDM Card Banner.png";
import FITMcBannerCard from "../../public/members/Fit Card Banner.png";

type ImageCharacter = {
  name: string;
  image: StaticImport;
}[];

export const ImagesCharacters: ImageCharacter = [
  {
    name: "Cellbit",
    image: CellbitBannerCard,
  },
  {
    name: "Felps",
    image: FelpsBannerCard,
  },
  {
    name: "Forever",
    image: ForeverBannerCard,
  },
  {
    name: "Mike",
    image: MikeBannerCard,
  },
  {
    name: "Pac",
    image: PacBannerCard,
  },
  {
    name: "Bagi",
    image: BagiBannerCard,
  },
  {
    name: "Nihachu",
    image: NihachuBannerCard,
  },
  {
    name: "Carre",
    image: CarreBannerCard,
  },
  {
    name: "German",
    image: GermanBannerCard,
  },
  {
    name: "Polispol",
    image: PolispolBannerCard,
  },
  {
    name: "Rivers",
    image: RiversBannerCard,
  },
  {
    name: "Willyrex",
    image: WillyrexBannerCard,
  },
  {
    name: "Vegetta",
    image: QuackityBannerCard, // is missing
  },
  {
    name: "SpreenDMC",
    image: SpreenDMCBannerCard,
  },
  {
    name: "QuackityToo",
    image: QuackityBannerCard, // is missing
  },

  {
    name: "MissaSinfonia",
    image: QuackityBannerCard, // is missing
  },
  {
    name: "Rubius",
    image: RubiusBannerCard,
  },
  {
    name: "Ironmouse",
    image: IronmouseBannerCard,
  },

  {
    name: "Maximus",
    image: MaximusBannerCard,
  },
  {
    name: "Luzu",
    image: LuzuBannerCard,
  },
  {
    name: "Quackity",
    image: QuackityBannerCard,
  },
  {
    name: "ElMariana",
    image: ElMarianaBannerCard,
  },
  {
    name: "Roier",
    image: RoierBannerCard,
  },
  {
    name: "Kameto",
    image: KametoBannerCard,
  },
  {
    name: "AntoineDaniel",
    image: AntoineDanielBannerCard,
  },
  {
    name: "BagheraJones",
    image: BagheraJonesBannerCard,
  },
  {
    name: "Etoiles",
    image: EtoilesBannerCard,
  },
  {
    name: "Aypierre",
    image: AypierreBannerCard,
  },
  {
    name: "Philza",
    image: PhilzaBannerCard,
  },
  {
    name: "BadBoyHalo",
    image: BadBoyHaloBannerCard,
  },
  {
    name: "FitMC",
    image: FITMcBannerCard,
  },
  {
    name: "Foolish",
    image: FoolishBannerCard,
  },
  {
    name: "Jaiden",
    image: JaidenBannerCard,
  },
  {
    name: "Slimecicle",
    image: SlimecicleBannerCard,
  },
  {
    name: "WilburSoot",
    image: QuackityBannerCard, // is missing
  },
  {
    name: "Lenay",
    image: LenayBannerCard,
  },
  {
    name: "TinaKitten",
    image: TinaKittenBannerCard,
  },
  {
    name: "Tubbo",
    image: TubboBannerCard,
  },
  {
    name: "DanTDM",
    image: DanTDMBannerCard,
  },
];
