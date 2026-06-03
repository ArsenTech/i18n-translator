import LangSelector from "../lang-selector";

// TODO: Map translation values after creating.
export default function LanguageSelect(){
     return (
          <div className="flex items-center gap-2">
               <span>From</span>
               <LangSelector placeholder="Base Language" className="flex-1"/>
               <span>to</span>
               <LangSelector className="flex-1"/>
          </div>
     )
}