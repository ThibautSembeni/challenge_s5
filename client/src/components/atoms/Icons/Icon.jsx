import {
  Arrow,
  CheckedCircle,
  Chevron,
  Cross,
  CrossCircle,
  CrossSquare,
  DatabaseChecked,
  DatabaseRemove,
  Denied,
  Download,
  Export,
  Gare,
  Gear,
  GetIn,
  Loading,
  LongArrow,
  Loupe,
  Moon,
  Move,
  OutlineSync,
  PencilOff,
  Pin,
  Placeholder,
  Plus,
  Profile,
  ReversedArrow,
  Screen,
  Sun,
  TablerSend,
  Trash,
  Upload,
  Warning,
  WarningTag,
} from "./_index";
import { Logout } from "./Logout";
import { Pencil } from "./Pencil";
import { Unknown } from "./tags/_index";

export function Icon({ width = 24, height = 24, icon, className }) {
  switch (icon) {
    case "check-circle":
      return (
        <CheckedCircle width={width} height={height} className={className} />
      );
    case "cross":
      return <Cross width={width} height={height} />;
    case "arrow":
      return <Arrow width={width} height={height} className={className} />;
    case "cross-square":
      return (
        <CrossSquare width={width} height={height} className={className} />
      );
    case "cross-circle":
      return (
        <CrossCircle width={width} height={height} className={className} />
      );
    case "denied":
      return <Denied width={width} height={height} />;
    case "warning":
      return <Warning width={width} height={height} />;
    case "unknown":
      return <Unknown width={width} height={height} />;
    case "gare":
      return <Gare width={width} height={height} />;
    case "gear":
      return <Gear width={width} height={height} />;
    case "loupe":
      return <Loupe width={width} height={height} />;
    case "moon":
      return <Moon width={width} height={height} />;
    case "pin":
      return <Pin width={width} height={height} />;
    case "plus":
      return <Plus width={width} height={height} className={className} />;
    case "profile":
      return <Profile width={width} height={height} />;
    case "reversed-arrow":
      return <ReversedArrow width={width} height={height} />;
    case "screen":
      return <Screen width={width} height={height} />;
    case "trash":
      return <Trash width={width} height={height} />;
    case "getIn":
      return <GetIn width={width} height={height} />;
    case "chevron":
      return <Chevron width={width} height={height} className={className} />;
    case "move":
      return <Move width={width} height={height} className={className} />;
    case "long-arrow":
      return <LongArrow width={width} height={height} className={className} />;
    case "sun":
      return <Sun width={width} height={height} className={className} />;
    case "download":
      return <Download width={width} height={height} className={className} />;
    case "export":
      return <Export width={width} height={height} className={className} />;
    case "warningTag":
      return <WarningTag width={width} height={height} className={className} />;
    case "loading":
      return <Loading width={width} height={height} className={className} />;
    case "logout":
      return <Logout width={width} height={height} className={className} />;
    case "pencil":
      return <Pencil width={width} height={height} className={className} />;
    case "pencil-off":
      return <PencilOff width={width} height={height} className={className} />;
    case "upload":
      return <Upload width={width} height={height} className={className} />;
    case "outline-sync":
      return (
        <OutlineSync width={width} height={height} className={className} />
      );
    case "tabler-sender":
      return <TablerSend width={width} height={height} className={className} />;
    case "database-checked":
      return (
        <DatabaseChecked width={width} height={height} className={className} />
      );
    case "database-remove":
      return (
        <DatabaseRemove width={width} height={height} className={className} />
      );
    default:
      return <Placeholder width={width} height={height} />;
  }
}
