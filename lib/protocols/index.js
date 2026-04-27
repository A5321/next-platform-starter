import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./Mixedsignals";
import { repeatingBreakupProtocols } from "./Repeatingbreakup";
import { thirdPersonProtocols } from "./Thirdperson";
import { trustSignalsProtocols } from "./trustSignals";
import { afterBreachProtocols } from "./afterBreach";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
  "repeating-breakup": repeatingBreakupProtocols,
  "third-person-grey-zone": thirdPersonProtocols,
  "trust-their-signals": trustSignalsProtocols,
  "after-breach-of-trust": afterBreachProtocols,
};
