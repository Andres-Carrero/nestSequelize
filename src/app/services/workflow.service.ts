import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { start } from 'repl';
import { where } from 'sequelize';
import { businessUnit } from 'src/models/model/businessUnit';
import { workflowStageAction } from 'src/models/model/relations/workflowStageAction';
import { roles } from 'src/models/model/role';
import { WorkflowHead } from 'src/models/model/workflowHead';
import { WorkflowStage } from 'src/models/model/workflowStages';
import { workflowTypeAction } from 'src/models/model/workflowTypeAction';
import { v4 as uuidv4 } from 'uuid';
import { workflowDto, workflowTypeActionDto } from '../complements/dto/workflow.dto';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class WorkflowService {
    constructor(
        @InjectModel(WorkflowHead)
        private readonly headModel: typeof WorkflowHead,
        @InjectModel(WorkflowStage)
        private readonly stageModel: typeof WorkflowStage,
        @InjectModel(workflowTypeAction)
        private readonly typeActionModel: typeof workflowTypeAction,
        @InjectModel(workflowStageAction)
        private readonly StageActionModel: typeof workflowStageAction,
    ){}


    async Create(data: workflowDto){
        const bodyStage = data.WorkflowStage

        const head = await this.headModel.create({ 
            //@ts-ignore
            name: data.name, 
            description: data.description,
            businessId: data.businessId,
            WorkflowStage: bodyStage,
            unique_id: uuidv4(),
        });
        
        if (bodyStage){
            for (let cat = 0; cat < bodyStage.length; cat++) {
                const stages = bodyStage[cat];

                const stage = await this.stageModel.create({ 
                    //@ts-ignore
                    name: stages.nameStage, 
                    description: stages.descriptionStage,
                    order: stages.orderStage,
                    WorkflowHeadId: head.id,
                    unique_id: stages.unique_id = uuidv4()
                });

                let bodyTypeAction = stages.typeAction
                if(bodyTypeAction && stage){
                    for (let cat = 0; cat < bodyTypeAction.length; cat++) {
                        const typesAction = bodyTypeAction[cat];    

                        const findTypeAction = await this.typeActionModel.findOne({where: {id: typesAction.typeActionId}  } )
                        if (findTypeAction == null || !findTypeAction ){return 'no hay resultados'}

                        const stageAction = await this.StageActionModel.create({ 
                            stageId: stage.id,
                            typeActionId: findTypeAction.id
                        });
                    }
                }
            }

        }

        /*//@ts-ignore
        const findhead = await this.headModel.findOne({where: {unique_id: head.unique_id }, 
            include: [{model:WorkflowStage, include:[workflowTypeAction]}] } )
        if (findhead == null || !findhead ){return 'no hay resultados para head'}*/

        return data
    }

    
    async getAll(options: PaginationOptionsInterface): Promise<any>{
        
       const {count, rows} = await this.headModel.findAndCountAll({
        limit: options.limits,
        offset: options.pages, //@ts-ignore
        include: [{model: WorkflowStage, attributes: ['unique_id', 'name', 'description', 'order'],         //@ts-ignore
        include: [{model:workflowTypeAction, attributes: ['unique_id', 'name', 'description', 'icon']}] },  //@ts-ignore
        {model:businessUnit, attributes: ['unique_id', 'name', 'description', 'tenantId', 'roleId']}]
        });
 
      return {rows, count};
    }

    

    async delete(id, data: workflowDto):Promise<any>{
        const eliminate = await this.headModel.update({
            deleteAt: new Date,
            status: false
        }, {where: {unique_id: id}})
        return [id, 'eliminado con exito']
    }


    async findById(id):Promise<any>{
        //@ts-ignore
        const findheadV2 = await this.headModel.findOne({where: {unique_id: id },
            include: [{model: WorkflowStage, attributes: ['unique_id', 'name', 'description', 'order'], 
            include: [{model:workflowTypeAction, attributes: ['unique_id', 'name', 'description', 'icon']}]  },
            {model:businessUnit, attributes: ['unique_id', 'name', 'description', 'tenantId', 'roleId']}]    
        } )
        if (findheadV2 == null || !findheadV2 ){return 'no hay resultados para head'}

        return findheadV2
    }
    


async Update(id, data: workflowDto){
    const bodyStage = data.WorkflowStage
    console.log(bodyStage);
    
        //@ts-ignore
    const findhead = await this.headModel.findOne({where: {unique_id: id}, 
        include: [{model: WorkflowStage, include: [workflowTypeAction]},{model:businessUnit}]    } )
            if (!findhead || findhead == null){throw new Error("Head no encontrado")}

    const head = await this.headModel.update({
        name: data.name, 
        description: data.description,
        businessId: data.businessId,
        updatedAt: new Date
        }, {
            where: {unique_id: findhead.unique_id }, 
        }
    );

        if(bodyStage){
            for (let cat = 0; cat < bodyStage.length; cat++) {
                const stages = findhead.WorkflowStage[cat]

                /*if(bodyStage[cat].delete === true){
                    console.log(bodyStage[cat].delete);
                }*/

                if (!stages ){
                    const stage = await this.stageModel.create({ 
                        //@ts-ignore
                        name: bodyStage[cat].nameStage, 
                        description: bodyStage[cat].descriptionStage,
                        order: bodyStage[cat].orderStage,
                        WorkflowHeadId: findhead.id,
                        unique_id: bodyStage[cat].unique_id = uuidv4()
                    });

                    let bodyTypeAction = bodyStage[cat].typeAction
                    if(bodyTypeAction && stage){
                        for (let cat = 0; cat < bodyTypeAction.length; cat++) {
                            const typesAction = bodyTypeAction[cat];    
    
                            const findTypeAction = await this.typeActionModel.findOne({where: {id: typesAction.typeActionId}  } )
                            if (findTypeAction == null || !findTypeAction ){return 'no hay resultados'}
    
                            const stageAction = await this.StageActionModel.create({ 
                                stageId: stage.id,
                                typeActionId: findTypeAction.id
                            });
                        }
                    }


                    
                    

                    console.log('creado');
                    
                }else{

                    if(bodyStage[cat].delete == true){
                        console.log(bodyStage[cat].delete);
            
                    }
                    
                    const findStage = await this.stageModel.findOne({
                        where: {unique_id: stages.unique_id}, //@ts-ignore
                        include: [workflowTypeAction] 
                    })

                    const stage = await this.stageModel.update({ 
                        //@ts-ignore
                        name: bodyStage[cat].nameStage, 
                        description: bodyStage[cat].nameStage ,
                        order: bodyStage[cat].orderStage,
                        updatedAt: new Date
                    }, {where: {unique_id: findStage.unique_id}});

                    
                    const findStageAction = await this.StageActionModel.findOne({where: {stageId: findStage.id} } )
                    if (findStage == null || !findStage ){return 'no hay resultados para stage'}
                    
                   const typeStage = await this.StageActionModel.update({
                        typeActionId: data.WorkflowStage[cat].typeAction[cat].typeActionId,
                        status: data.WorkflowStage[cat].typeAction[cat].statusType
                    }, {where: {stageId: findStage.id}})

                    console.log('actualizo');
                    
                }


            }

 
        }


        console.log('lo logro');
        

        //@ts-ignore
        const findheadV2 = await this.headModel.findOne({where: {unique_id: id},
            include: [{model: WorkflowStage, attributes: ['unique_id', 'name', 'description', 'order'], 
            include: [{model:workflowTypeAction, attributes: ['unique_id', 'name', 'description', 'icon']}]  },
            {model:businessUnit}]    } )


        if (findheadV2 == null || !findheadV2 ){return 'no hay resultados para head'}

        return findheadV2

    }



}
