import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaHome,
  FaTachometerAlt,
  FaBook,
  FaInfoCircle,
  FaFilter,
  FaSearch,
  FaArrowRight,
  FaChevronDown,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import {
  FaRightFromBracket,
  FaMapLocation,
  FaLocationDot,
} from "react-icons/fa6";
import {
  MdEditDocument,
  MdOutlineZoomIn,
  MdOutlineZoomOut,
  MdTimer,
} from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { HiDocumentText, HiDocumentCheck } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { GrDocumentTime, GrDocumentUser, GrDocumentLocked,  } from "react-icons/gr";
import { LiaHardHatSolid } from "react-icons/lia";

export const icons = {
  eye: FaEye,
  eyeSlash: FaEyeSlash,
  user: FaUser,
  logout: FaRightFromBracket,
  home: FaHome,
  dashboard: FaTachometerAlt,
  book: FaBook,
  info: FaInfoCircle,
  docEdit: MdEditDocument,
  document: IoIosDocument,
  documentText: HiDocumentText,
  documentCheck: HiDocumentCheck,
  location: FaMapLocation,
  menu: IoMenu,
  filter: FaFilter,
  search: FaSearch,
  arrowRight: FaArrowRight,
  zoomIn: MdOutlineZoomIn,
  zoomOut: MdOutlineZoomOut,
  locationDot: FaLocationDot,
  chevronDown: FaChevronDown,
  fullscreen: BsFullscreen,
  fullscreenExit: BsFullscreenExit,
  check: FaCheck,
  times: FaTimes,
  plus: FaPlus,
  trash: FaTrash,
  edit: FaEdit,
  timer: MdTimer,
  helmet: LiaHardHatSolid,
  permitClosed: GrDocumentLocked,
  permitExecution: GrDocumentUser,
  permitProgramed: GrDocumentTime,
};
