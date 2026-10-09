# 2026-10-08 — L00 response review

User correctly explained shared-engine consistency, reuse/testing and wrong-direction ERP dependencies. The response used document-generation/formatting/PDF examples, so business-record terminology needs clarification rather than automatic lesson completion.

Assistant reviewed docs read-only, consulted official DocType/Document API documentation and updated learning/progress records only. No code, commands for user implementation, installs or runtime checks were introduced.

Correction: DocType is metadata; Document is a business-record instance; PDF is its rendered representation. Shared engine means shared authorization/lifecycle/transaction behavior, while transport outputs can differ. Browser UI calls server APIs. ERP registers domain hooks/controllers through public extension contracts, and database work joins the engine's unit of work.

Await short learning check: who checks generic Sales Invoice submit permission, and who implements ERP accounting rules? Then teach L01 Git/history at the user's pace. No user implementation step recorded.
