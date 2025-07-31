import { withQuery } from "ufo";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useLogger } from "../logger";
import type { IAnchorProps } from "./anchor.props";

const logger = useLogger("anchor");

export function useAnchor(props: IAnchorProps) {
    const route = useRoute();

    const isLink = computed(() => (props.link ?? true) && !!props.href);
    const isNuxtLink = computed(() => isLink.value && props.nuxt);

    const query = computed(() => (props.preserveQuery ? route?.query : undefined));
    const origin = computed(() => (props.includeOrigin ? props.origin : undefined));

    const toHref = computed(() => {
        if (!isLink.value) return;

        if (!props.href) {
            logger.warn(`Invalid anchor: validation failed for element #${props.id}. Anchor must be a valid href.`);
            return undefined;
        }

        // return withQuery(props.href, { qry: query.value, org: origin.value });
        return withQuery(props.href, { ...query.value, org: origin.value });
    });

    return { isLink, isNuxtLink, toHref };
}
