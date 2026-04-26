import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./mixedSignals";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
};
