import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./Mixedsignals";
import { repeatingBreakupProtocols } from "./Repeatingbreakup";
import { thirdPersonProtocols } from "./Thirdperson";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
  "repeating-breakup": repeatingBreakupProtocols,
  "third-person-grey-zone": thirdPersonProtocols,
};
