import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./mixedSignals";
import { repeatingBreakupProtocols } from "./repeatingBreakup";
import { thirdPersonProtocols } from "./thirdPersonGreyZone";
import { trustSignalsProtocols } from "./trustTheirSignals";
import { afterBreachProtocols } from "./afterBreachOfTrust";
import { silentExitProtocols } from "./silentExit";
import { hyperParentProtocols } from "./hyperControllingParent";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
  "repeating-breakup": repeatingBreakupProtocols,
  "third-person-grey-zone": thirdPersonProtocols,
  "trust-their-signals": trustSignalsProtocols,
  "after-breach-of-trust": afterBreachProtocols,
  "silent-exit": silentExitProtocols,
  "hyper-controlling-parent": hyperParentProtocols,
};
