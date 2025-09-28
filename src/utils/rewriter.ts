export function buildRewriters(
  origin: string,
  pathToFilename: Map<string, string>
) {
  const originEscaped = origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const absHrefRegex = new RegExp(
    `href=(\"|\')(${originEscaped})(/[^\"\']*)(\\1)`,
    "g"
  );
  const absActionRegex = new RegExp(
    `action=(\"|\')(${originEscaped})(/[^\"\']*)(\\1)`,
    "g"
  );
  const relHrefRegex = /href=(\"|\')(\/[^\"\']*)(\1)/g;
  const relActionRegex = /action=(\"|\')(\/[^\"\']*)(\1)/g;

  const rewritePath = (path: string): string | null => {
    try {
      const u = new URL(path, origin);
      if (u.origin !== origin) return null;
      const file = pathToFilename.get(u.pathname);
      return file ?? null;
    } catch {
      return null;
    }
  };

  const rewriteHtml = (html: string): string => {
    // Remove Framer badge/editor artifacts before link rewriting
    html = html
      // Remove container by id, regardless of attribute order
      .replace(
        /<div[^>]*\bid=("|')__framer-badge-container\1[^>]*>[\s\S]*?<\/div>/g,
        ""
      )
      // Remove any element with __framer-badge class
      .replace(
        /<[^>]*class=("|')[^"']*__framer-badge[^"']*\1[^>]*>[\s\S]*?<\/[a-zA-Z0-9:-]+>/g,
        ""
      )
      // Remove standalone self-closing nodes with __framer-badge
      .replace(/<[^>]*class=("|')[^"']*__framer-badge[^"']*\1[^>]*\/>/g, "")
      // Remove editorbar
      .replace(
        /<div[^>]*\bid=("|')__framer-editorbar-container\1[^>]*>[\s\S]*?<\/div>/g,
        ""
      )
      .replace(
        /<button[^>]*id=("|')__framer-editorbar-button\1[^>]*>[\s\S]*?<\/button>/g,
        ""
      )
      .replace(
        /<span[^>]*id=("|')__framer-editorbar-label\1[^>]*>[\s\S]*?<\/span>/g,
        ""
      )
      .replace(
        /<[^>]*id=("|')__framer-editorbar[^"']*\1[^>]*>[\s\S]*?<\/[a-zA-Z0-9:-]+>/g,
        ""
      )
      // Remove iframe editorbar (both normal and self-closing)
      .replace(
        /<iframe[^>]*id=("|')__framer-editorbar\1[\s\S]*?<\/iframe>/g,
        ""
      )
      .replace(/<iframe[^>]*id=("|')__framer-editorbar\1[^>]*\/>/g, "");

    // Absolute same-origin href/action
    html = html.replace(
      absHrefRegex as unknown as RegExp,
      (_m, q, _o, p, q2) => {
        const file = rewritePath(p);
        return file ? `href=${q}${file}${q2}` : _m;
      }
    );
    html = html.replace(
      absActionRegex as unknown as RegExp,
      (_m, q, _o, p, q2) => {
        const file = rewritePath(p);
        return file ? `action=${q}${file}${q2}` : _m;
      }
    );
    // Relative href/action beginning with /
    html = html.replace(relHrefRegex, (_m, q, p, q2) => {
      const file = rewritePath(p);
      return file ? `href=${q}${file}${q2}` : _m;
    });
    html = html.replace(relActionRegex, (_m, q, p, q2) => {
      const file = rewritePath(p);
      return file ? `action=${q}${file}${q2}` : _m;
    });

    // Inject defensive CSS to hide Framer UI if any slips through
    const hideCss =
      '<style data-export="framer-hide">a.__framer-badge, .__framer-badge, #__framer-badge-container, div#__framer-badge-container, [data-framer-name="Badge"], [data-framer-appear-id][class*="__framer-badge"], [class*="__framer-badge"], div[id^="__framer-badge"], div[class^="framer-"][class*="__framer-badge"], #__framer-editorbar-container, #__framer-editorbar-button, #__framer-editorbar-label, [id^="__framer-editorbar"], div[id^="__framer-editorbar"] { display: none !important; pointer-events: none !important; visibility: hidden !important; }</style>';
    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<\/head>/i, hideCss + "</head>");
    } else {
      html = hideCss + html;
    }

    // Inject runtime remover to clean late-inserted nodes
    const removerScript =
      '<script data-export="framer-hide">(function(){function rm(){try{var sel=["a.__framer-badge",".__framer-badge","#__framer-badge-container","div#__framer-badge-container","[data-framer-name=\\"Badge\\"]","[data-framer-appear-id][class*=\\"__framer-badge\\"]","[class*=\\"__framer-badge\\"]","div[id^=\\"__framer-badge\\"]","div[class^=\\"framer-\\"][class*=\\"__framer-badge\\"]","#__framer-editorbar-container","#__framer-editorbar-button","#__framer-editorbar-label","[id^=\\"__framer-editorbar\\"]","div[id^=\\"__framer-editorbar\\"]"];document.querySelectorAll(sel.join(",")).forEach(function(n){try{n.remove();}catch(_){}});}catch(e){}}rm();var mo=new MutationObserver(function(){rm();});try{mo.observe(document.documentElement||document.body,{childList:true,subtree:true});}catch(_){ }window.addEventListener("load",rm);})();</script>';
    if (/<body[^>]*>/i.test(html)) {
      html = html.replace(/<\/body>/i, removerScript + "</body>");
    } else {
      html = html + removerScript;
    }
    return html;
  };

  return rewriteHtml;
}
